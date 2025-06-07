// src/components/NewsSection.tsx
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deeplTranslate } from "../services/deepl/translate"; // 경로는 실제 위치에 맞게 조정

// NewsItem 타입 정의 업데이트 (useFetchNews에서 오는 id 타입과 일치하도록 string | number 포함)
type NewsItem = {
  id: string | number; // id 타입 string 또는 number
  title: string;
  time: string;
  publishedAt: string;
};

type Props = {
  title: string;
  items: NewsItem[];
};

// 각 번역 요청 사이의 지연 시간 (밀리초)
const TRANSLATION_DELAY_MS = 300; // 필요에 따라 이 값을 조정하세요.

export default function NewsSection({ title, items }: Props) {
  const navigate = useNavigate();

  // 번역된 제목을 저장하는 상태: { [id: string | number]: 번역된 제목 }
  const [translatedTitles, setTranslatedTitles] = useState<{ [key: string | number]: string }>({});

  // 비동기 번역 작업을 수행하는 useEffect
  useEffect(() => {
    // items 배열이 비어 있으면 아무것도 하지 않습니다.
    if (items.length === 0) {
      // 필요하다면 items가 비어질 때 번역된 제목 상태를 초기화할 수 있습니다.
      // setTranslatedTitles({});
      return;
    }

    let isCanceled = false; // 컴포넌트 언마운트 또는 items 변경 시 비동기 작업 중단 플래그

    const translateItemsSequentially = async () => {
      const newTranslations: { [key: string | number]: string } = {};

      // items 배열을 순회하며 번역이 필요한 항목만 처리
      for (const item of items) {
        // useEffect 클린업 함수가 호출되어 작업이 취소되었는지 확인
        if (isCanceled) return;

        // 해당 아이템 ID에 대한 번역된 제목이 아직 상태에 없으면 번역 시도
        // 이미 실패했거나 (item.title로 저장됨) 성공했으면 건너뜁니다.
        if (translatedTitles[item.id] === undefined) {
          try {
            // 실제 Deepl 번역 API 호출
            const translated = await deeplTranslate(item.title);

            // 비동기 작업 완료 후에도 취소되지 않았는지 다시 확인
            if (isCanceled) return;

            // 번역 성공 시, 해당 아이템의 번역 결과를 임시 객체에 저장
            newTranslations[item.id] = translated;
          } catch (error) {
            console.error(`Failed to translate title for id ${item.id}:`, error);
            // 번역 실패 시, 원본 제목을 저장하여 다시 시도하지 않도록 표시
            newTranslations[item.id] = item.title;
          }

          // 각 번역 시도 (성공/실패 모두 포함) 후에 지정된 시간만큼 대기
          // 이 지연이 API 호출 속도 제한의 핵심입니다.
          await new Promise((resolve) => setTimeout(resolve, TRANSLATION_DELAY_MS));
        }
      }

      // 순회가 모두 끝난 후, 새로 얻은 번역 결과를 상태에 한 번에 업데이트
      // 작업이 취소되지 않았고 업데이트할 내용이 있을 때만 실행
      if (!isCanceled && Object.keys(newTranslations).length > 0) {
        setTranslatedTitles((prev) => ({ ...prev, ...newTranslations }));
      }
    };

    // 비동기 번역 작업 시작
    translateItemsSequentially();

    // Cleanup 함수: useEffect가 다시 실행되거나 컴포넌트가 언마운트될 때 호출
    return () => {
      isCanceled = true; // 진행 중인 비동기 작업에게 취소되었음을 알림
    };
  }, [items]); // 의존성 배열: items 배열의 참조가 변경될 때마다 이펙트를 다시 실행

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box
        sx={{
          height: "2px",
          width: "100%",
          bgcolor: "black",
          mb: 2,
          borderRadius: 1,
        }}
      />

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((item) => {
          // item.publishedAt이 NewsItem 타입에 포함되어 있다고 가정합니다.
          // NewsItem 타입 정의 시 publishedAt: string; 이 포함되어야 합니다.
          const newsRandomId = new Date(item.publishedAt).getTime();
          return (
            <Box
              key={item.id}
              onClick={() => navigate(`/news/${newsRandomId}`, { state: { newsItem: item } })}
              sx={{
                width: 180,
                flexShrink: 0,
                scrollSnapAlign: "start",
                borderRadius: 0.5,
                boxShadow: 1,
                bgcolor: "#fff",
                p: 1,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 3,
                },
                userSelect: "none",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  bgcolor: "#ccc",
                  borderRadius: 0.5,
                  mb: 1,
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                {item.time}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  fontWeight: 500,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                {/* 번역된 제목이 있으면 사용하고, 없으면 원본 제목 사용 */}
                {translatedTitles[item.id] || item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
