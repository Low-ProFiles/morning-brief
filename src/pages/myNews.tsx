// src/pages/InterestNews.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import "./mypage.css";

type Topic = {
  // UI 표시용 이름 (한글)
  name: string;
  // DB 저장용 값 (영문 또는 식별자)
  value: string;
  // 선택 상태
  selected: boolean;
};

// 기본 관심 주제 목록 정의 (영문 값 추가)
const defaultTopics: Topic[] = [
  { name: "정치", value: "politics", selected: true },
  { name: "경제", value: "economy", selected: false },
  { name: "사회", value: "society", selected: false },
  { name: "문화", value: "culture", selected: true },
  // 필요한 다른 카테고리 추가 (value는 고유한 영문/식별자 사용)
];

export default function MyNews() {
  const { user } = useAuth();
  const db = getFirestore();

  // topics 상태는 defaultTopics를 기반으로 하되, DB 값으로 selected 상태 업데이트
  const [topics, setTopics] = useState<Topic[]>(defaultTopics.map((topic) => ({ ...topic }))); // defaultTopics 복사하여 초기화
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "userNewsSettings", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.topics && Array.isArray(data.topics)) {
            // DB에서 불러온 topics 데이터를 사용하여 현재 topics 상태 업데이트
            // defaultTopics를 기준으로 하되, 불러온 데이터의 selected 상태를 반영
            const loadedTopics: Topic[] = data.topics; // DB에 저장된 데이터 형태와 일치해야 함 (여기서는 Topic[] 그대로 저장한다고 가정)

            const updatedTopics = defaultTopics.map((defaultTopic) => {
              // DB 데이터에서 같은 value를 가진 항목을 찾아서 selected 상태를 가져옴
              const loadedTopic = loadedTopics.find((t) => t.value === defaultTopic.value);
              return {
                ...defaultTopic,
                selected: loadedTopic ? loadedTopic.selected : defaultTopic.selected, // DB에 없으면 defaultTopics의 selected 사용
              };
            });
            setTopics(updatedTopics);
          } else {
            // topics 필드가 없거나 형식이 다르면 defaultTopics 상태 그대로 유지 (초기 상태)
            setTopics(defaultTopics.map((topic) => ({ ...topic })));
          }
        } else {
          // 해당 사용자의 설정 문서가 없으면 defaultTopics 상태 그대로 유지
          setTopics(defaultTopics.map((topic) => ({ ...topic })));
        }
      } catch (error) {
        console.error("관심 뉴스 설정 불러오기 실패:", error);
        // 에러 발생 시 defaultTopics 상태 그대로 유지
        setTopics(defaultTopics.map((topic) => ({ ...topic })));
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user, db]); // user와 db가 변경될 때마다 이펙트 재실행

  const toggle = (idx: number) => {
    const newTopics = [...topics];
    newTopics[idx].selected = !newTopics[idx].selected;
    setTopics(newTopics);
    // 토글 시 바로 저장하지 않고, 저장 버튼 클릭 시 저장
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const docRef = doc(db, "userNewsSettings", user.uid);
      // DB에 topics 배열 전체 (name, value, selected 포함) 저장
      await setDoc(docRef, { topics: topics }, { merge: true });
      alert("관심 뉴스 설정이 저장되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="mypage-container">
      <Typography variant="h5" gutterBottom>
        관심 뉴스 설정
      </Typography>
      <div className="news-grid">
        {topics.map((topic, idx) => (
          <div
            key={topic.value} // key를 idx 대신 topic.value로 변경 (더 안정적)
            className={`news-item ${topic.selected ? "selected" : ""}`}
            onClick={() => toggle(idx)}
          >
            {topic.name} {/* UI에는 name (한글) 표시 */}
          </div>
        ))}
      </div>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </Button>
      </Box>
    </div>
  );
}
