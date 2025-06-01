// src/components/NewsSection.tsx
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type NewsItem = {
  id: number;
  title: string;
  time: string;
};

type Props = {
  title: string;
  items: NewsItem[];
};

export default function NewsSection({ title, items }: Props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      {/* 섹션 제목 */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      {/* 제목 아래 줄 */}
      <Box
        sx={{
          height: '2px',
          width: '100%',
          bgcolor: 'black',
          mb: 2,
          borderRadius: 1,
        }}
      />

      {/* 카드 리스트 */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 2,
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            onClick={() => navigate(`/news/${item.id}`)}
            sx={{
              width: 180,  // 카드 크기 고정 (적당히 줄여서)
              flexShrink: 0,
              scrollSnapAlign: 'start',
              borderRadius: 0.5,
              boxShadow: 1,
              bgcolor: '#fff',
              p: 1,
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 3,
              },
              userSelect: 'none',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 100,
                bgcolor: '#ccc',
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
                display: '-webkit-box',
                WebkitLineClamp: 2,          // 2줄까지만 보이게
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 14,
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
