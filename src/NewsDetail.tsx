import { useState, useEffect } from "react"; // useState, useEffect import
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "./theme";

import { deeplTranslate } from "./services/deepl/translate"; // Deepl 번역 함수 임포트

// NewsItem 타입 정의 (useLocation state에서 가져온 데이터 형태)
interface NewsItem {
  id: string | number;
  title: string;
  time: string;
  publishedAt: string;
  body?: string; // body는 Optional일 수 있습니다.
  url?: string;
  source?: string;
  category?: string;
}

export default function NewsDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const newsItem = location.state?.newsItem as NewsItem | undefined; // state에서 newsItem 객체 가져오기 (타입 단언)

  // 번역된 본문을 저장하는 상태
  const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
  const [translatedBody, setTranslatedBody] = useState<string | null>(null);
  // 번역 로딩 상태 (선택 사항)
  const [isTranslatingTitle, setIsTranslatingTitle] = useState(false);
  const [isTranslatingBody, setIsTranslatingBody] = useState(false);

  // Effect: newsItem.body가 변경될 때마다 번역 시작
  useEffect(() => {
    // newsItem 객체가 존재하고 body 내용이 있을 경우에만 번역 시도
    if (newsItem?.body) {
      setIsTranslatingBody(true); // 번역 로딩 시작
      setIsTranslatingTitle(true);
      setTranslatedBody(null); // 새로운 아이템 로드 시 이전 번역 결과 초기화

      const translateBodyContent = async () => {
        try {
          const translated1 = await deeplTranslate(newsItem.title); // 번역 함수 호출
          const translated2 = await deeplTranslate(newsItem.body);
          setTranslatedTitle(translated1); // 번역된 결과 상태 업데이트
          setTranslatedBody(translated2); // 번역된 결과 상태 업데이트
        } catch (error) {
          console.error("Failed to translate body:", error);
          // 번역 실패 시 원본 본문 사용 또는 에러 메시지 표시
          setTranslatedTitle(translated1);
          setTranslatedBody(translated2); // 실패 시 원본 본문으로 대체
          // setTranslatedBody("<p>본문 번역에 실패했습니다.</p>" + newsItem.body); // 실패 메시지 + 원본
        } finally {
          setIsTranslatingBody(false); // 번역 로딩 종료
          setIsTranslatingTitle(false);
        }
      };

      translateBodyContent(); // 비동기 번역 함수 호출
    } else {
      // newsItem이 없거나 body가 비어있으면 번역 상태 초기화
      setIsTranslatingTitle(false);
      setIsTranslatingBody(false);
    }

    // Cleanup 함수 (필요시 비동기 작업 취소 로직 추가 가능)
    return () => {
      // 예를 들어, fetch API의 AbortController를 사용한다면 여기서 신호 보내기
    };
  }, [newsItem?.body, newsItem?.id]); // 의존성 배열: newsItem의 body나 ID가 변경되면 이펙트 재실행

  // newsItem 데이터가 없을 경우 처리
  if (!newsItem) {
    return (
      <Container
        sx={{
          pt: theme.customSpacing.pagePaddingTop,
          pb: theme.customSpacing.pagePaddingBottom,
          textAlign: "center",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, pl: 0 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6">뉴스 정보를 불러올 수 없습니다.</Typography>
      </Container>
    );
  }

  // 발행일 포맷팅
  const publishedDate = new Date(newsItem.publishedAt);
  const formattedDate =
    publishedDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".") +
    ", " +
    publishedDate.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  // 본문 내용을 결정: 번역 완료 시 translatedBody 사용, 아니면 isTranslatingBody 상태에 따라 로딩 또는 원본
  const titleContentToDisplay =
    translatedTitle !== null
      ? translatedTitle // 번역 완료
      : isTranslatingTitle // 번역 로딩 중
        ? "제목 번역 중..." // 또는 로딩 스피너
        : newsItem.title || ""; // 번역 시작 전 또는 실패 시 원본 본문 (body가 없을 수도 있으니 빈 문자열 폴백)

  // 본문 내용을 결정: 번역 완료 시 translatedBody 사용, 아니면 isTranslatingBody 상태에 따라 로딩 또는 원본
  const bodyContentToDisplay =
    translatedBody !== null
      ? translatedBody // 번역 완료
      : isTranslatingBody // 번역 로딩 중
        ? "<p>본문 번역 중...</p>" // 또는 로딩 스피너
        : newsItem.body || ""; // 번역 시작 전 또는 실패 시 원본 본문 (body가 없을 수도 있으니 빈 문자열 폴백)

  return (
    <Container
      sx={{
        pt: theme.customSpacing.pagePaddingTop,
        pb: theme.customSpacing.pagePaddingBottom,
      }}
    >
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, pl: 0 }}>
        <ArrowBackIosNewIcon />
      </IconButton>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {titleContentToDisplay} {/* 제목은 MyMain에서 미리 번역되어 온다고 가정 */}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
        {formattedDate}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 160, // 실제 이미지 사용 시 img 태그로 변경
          bgcolor: "#ccc",
          borderRadius: 0.5,
          mb: 2,
        }}
      />

      {/* dangerouslySetInnerHTML 사용 */}
      {/* HTML 내용을 직접 렌더링하므로 보안에 주의하세요. */}
      <Typography
        variant="body1"
        component="div"
        sx={{ fontFamily: "initial" }}
        // 결정된 본문 내용을 dangerouslySetInnerHTML에 전달
        dangerouslySetInnerHTML={{ __html: bodyContentToDisplay }}
      />
    </Container>
  );
}
