// src/NewsDetail.tsx
import { Box, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import theme from './theme';

export default function NewsDetail() {
  const navigate = useNavigate();

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

      {/* 제목 */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        살 빼려면 주 3일 간헐적 단식… 적게 먹는 것보다 체중 감량 효과 커
      </Typography>

      {/* 날짜 */}
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        2025.04.02, 오전 6:01
      </Typography>

      {/* 이미지 자리 */}
      <Box
        sx={{
          width: '100%',
          height: 160,
          bgcolor: '#ccc',
          borderRadius: 0.5,
          mb: 2,
        }}
      />

      {/* 본문 */}
      <Typography variant="body1" paragraph sx={{ fontFamily: 'initial' }}>
        일일 섭취 열량을 줄이는 것보다 일주일에 3일은 간헐적 단식을 하고 4일은 정상 식사를 하는 ‘4:3 간헐적 단식’이 체중 감량에 더 효과적이라는 연구 결과가 나왔다.
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
        
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontFamily: 'initial' }}>
        미국 콜로라도대 대니얼 오스텐도르프 박사팀은 미국 내과학회 저널 내과학 회보에서 과체중 또는 비만 성인 165명을 대상으로 1년간 진행한 무작위 임상 시험에서 4:3 간헐적 단식이 일일 열량 제한보다 체중 감소 효과가 더 큰 것으로 나타났다고 밝혔다.
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontFamily: 'initial' }}>
        간헐적 단식은 하루 중 공부 상태를 일정 수준 이상 유지하면서 식사와 단식을 반복하는 식이요법이다. 오후 4시부터 16시간 동안 아무것도 먹지 않고 아침 8시 이후 식사하는 방식(16:8 단식) 등이 대표적이다.
      </Typography>
    </Container>
  );
}
