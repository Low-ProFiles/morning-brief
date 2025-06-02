import axios from 'axios';
import { split as splitSentences } from 'sentence-splitter';
import pLimit from 'p-limit';
import { HUGGING_FACE_API_TOKEN } from '../../config/apiToken'
import { HUGGING_FACE_API_URL } from '../../config/apiUrl';

/** 최대 입력 토큰 수 */
const MAX_TOKENS: number = 1024;
/** 청크당 최대 문자 수 (토큰 대비 보수적 추정) */
const CHUNK_CHAR_SIZE: number = 2048;
/** 동시 호출 제한 */
const CONCURRENCY_LIMIT: number = 3;
const limit = pLimit(CONCURRENCY_LIMIT);

/**
 * 대략적인 토큰 수 추정 (4 chars ≈ 1 token)
 */
const estimateTokens = (txt: string): number => Math.ceil(txt.length / 4);

/**
 * 문장 경계 기준으로 CHUNK_CHAR_SIZE 이하 범위 내에서 청크 생성
 */
const getSmartChunks = (text: string): string[] => {
  const sentences = splitSentences(text)
    .filter(node => node.type === 'Sentence')
    .map((node: any) => node.raw);

  const chunks: string[] = [];
  let buffer = '';

  for (const sent of sentences) {
    const candidate = buffer ? `${buffer} ${sent}` : sent;
    // 보수적으로 문자 수 자르기 + 토큰 추정
    const truncated = candidate.length > CHUNK_CHAR_SIZE
      ? candidate.slice(0, CHUNK_CHAR_SIZE)
      : candidate;
    if (estimateTokens(truncated) <= MAX_TOKENS) {
      buffer = truncated;
    } else {
      if (buffer) chunks.push(buffer.trim());
      buffer = sent.slice(0, CHUNK_CHAR_SIZE);
    }
  }
  if (buffer) chunks.push(buffer.trim());
  return chunks;
};

/**
 * 청크별 요약 호출 (3회 재시도 포함)
 */
const summarizeText = async (text: string): Promise<string> => {
  const payload = {
    inputs: text,
    parameters: {
      max_length: 200,
      min_length: 50,
      num_beams: 4,
      length_penalty: 1.2,
      no_repeat_ngram_size: 2,
      truncation: true
    }
  };

  for (let i = 1; i <= 3; i++) {
    try {
      const { data } = await axios.post<{ summary_text: string }[]>(HUGGING_FACE_API_URL, payload, {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      return Array.isArray(data) ? data[0].summary_text : text;
    } catch (err) {
      if (i === 3) {
        console.error(`Summarization failed:`, err);
        return text;
      }
      await new Promise(res => setTimeout(res, i * 1000));
    }
  }
  return text;
};

/**
 * 대용량 텍스트를 Map–Reduce 방식으로 요약
 */
export const summarizeLargeText = async (originalText: string): Promise<string> => {
  let working = originalText;

  while (estimateTokens(working) > MAX_TOKENS) {
    const chunks = getSmartChunks(working);
    const partials = await Promise.all(
      chunks.map(chunk => limit(() => summarizeText(chunk)))
    );
    working = partials.join(' ');
  }

  // 최종 한 번 더 요약
  return summarizeText(working);
};
