import React, { useState } from 'react';
import './mypage.css';

type Topic = {
  name: string;
  selected: boolean;
};

export default function InterestNews() {
  const [topics, setTopics] = useState<Topic[]>([
    { name: '정치', selected: true },
    { name: '경제', selected: false },
    { name: '사회', selected: false },
    { name: '문화', selected: true },
  ]);

  const toggle = (idx: number) => {
    const newTopics = [...topics];
    newTopics[idx].selected = !newTopics[idx].selected;
    setTopics(newTopics);
  };

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">관심 뉴스 설정</h2>
      <div className="news-grid">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className={`news-item ${topic.selected ? 'selected' : ''}`}
            onClick={() => toggle(idx)}
          >
            {topic.name}
          </div>
        ))}
      </div>
    </div>
  );
}
