import { Container } from '@mui/material';
import NewsSection from './components/NewsSection';
import theme from './theme';

const worldNews = [
  { id: 1, title: 'AI가 바꾸는 미래 AI가 바꾸는 미래 AI가 바꾸는 미래 AI가 바꾸는 미래', time: '7h ago' },
  { id: 2, title: '우주여행, 상용화 어디까지?', time: '6h ago' },
  { id: 3, title: '기후 변화 대응 전략', time: '5h ago' },
  { id: 4, title: '손흥민 기후 변화, 시즌 20호골!', time: '5h ago' },  
];

const sportsNews = [
  { id: 1, title: '손흥민, 시즌 20호골!', time: '2h ago' },
  { id: 2, title: '올림픽 준비 박차', time: '3h ago' },
  { id: 3, title: '김연아의 새로운 행보', time: '4h ago' },
];

const financeNews = [
  { id: 1, title: '비트코인 80,000달러 돌파', time: '1h ago' },
  { id: 2, title: '테슬라 주가 폭등', time: '2h ago' },
  { id: 3, title: '엔화 약세, 환율 비상', time: '4h ago' },
];

const businesslNews = [
  { id: 1, title: '비트코인 80,000달러 돌파', time: '1h ago' },
  { id: 2, title: '테슬라 주가 폭등', time: '2h ago' },
  { id: 3, title: '엔화 약세, 환율 비상', time: '4h ago' },
];

export default function MyMain() {
  return (
    <Container sx={{
    pt: theme.customSpacing.pagePaddingTop,
    pb: theme.customSpacing.pagePaddingBottom,
    }}>
      <NewsSection title="The world in brief" items={worldNews} />
      <NewsSection title="Sports" items={sportsNews} />
      <NewsSection title="Finance" items={financeNews} />
      <NewsSection title="Business" items={businesslNews} />
    </Container>
  );
}
