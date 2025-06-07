// src/components/AudioPlayer.tsx
import React from "react";
import { Box, Typography, IconButton, Slider, useTheme, useMediaQuery } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MicIcon from "@mui/icons-material/Mic";

export default function Audio() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm")); // sm 이상 화면 여부

  // 재생 속도 상태 (예시)
  const [playbackRate, setPlaybackRate] = React.useState(1.5);
  // 재생 위치 상태 (예시)
  const [position, setPosition] = React.useState(14.15);

  const duration = 5.3; // 총 재생 시간 (분 단위)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setPosition(newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 이미지 자리 */}
      <Box
        sx={{
          marginTop: "8vh",
          width: "60vw",
          height: "60vw",
          bgcolor: "#ccc",
          mb: 3,
        }}
      />

      {/* 제목 */}
      <Typography
        variant={isSmUp ? "h5" : "h6"}
        fontWeight="bold"
        sx={{ mb: 1, textAlign: "center" }}
      >
        오늘의 뉴스 요약
      </Typography>

      {/* 부제목 */}
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
        정치 7월 1일
      </Typography>

      {/* 컨트롤 바 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 2,
        }}
      >
        {/* 마이크 아이콘 */}
        <IconButton aria-label="mic" size={isSmUp ? "medium" : "small"}>
          <MicIcon fontSize={isSmUp ? "medium" : "small"} />
        </IconButton>

        {/* 재생 버튼 */}
        <IconButton
          aria-label="play"
          size={isSmUp ? "large" : "medium"}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": { bgcolor: theme.palette.primary.dark },
            boxShadow: 3,
          }}
        >
          <PlayArrowIcon fontSize={isSmUp ? "large" : "medium"} />
        </IconButton>

        {/* 재생 속도 */}
        <Typography variant="body2" sx={{ userSelect: "none", minWidth: 30, textAlign: "center" }}>
          x{playbackRate.toFixed(1)}
        </Typography>
      </Box>

      {/* 슬라이더 */}
      <Box sx={{ width: "100%", px: 1 }}>
        <Slider
          value={position}
          min={0}
          max={duration}
          step={0.01}
          onChange={handleSliderChange}
          aria-labelledby="audio-slider"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "text.secondary",
            px: 1,
          }}
        >
          <span>{position.toFixed(2)} min</span>
          <span>-{(duration - position).toFixed(2)} min</span>
        </Box>
      </Box>
    </Box>
  );
}
