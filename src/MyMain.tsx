import { Container, Typography } from "@mui/material";
import NewsSection from "./components/NewsSection";
import theme from "./theme";
import { useState, useEffect } from "react";
import { NewsItem } from "./types/common/newsItem";

import { useAuth } from "./contexts/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { useFetchNews } from "./hooks/useFetchNews";
import { StandardCategory } from "./config/apiParameterMapping";

const newsSectionsDisplayMap: { [key in StandardCategory]?: string } = {
  politics: "정치 뉴스",
  economy: "경제 뉴스",
  society: "사회 뉴스",
  culture: "문화 뉴스",
  sports: "스포츠 뉴스",
};

type NewsItemWithCategory = NewsItem & { category: StandardCategory };

export default function MyMain() {
  const { user, loading: authLoading } = useAuth();
  const db = getFirestore();

  const [selectedStandardCategories, setSelectedStandardCategories] = useState<StandardCategory[]>(
    [],
  );
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) {
      if (!user && !authLoading) {
        setSelectedStandardCategories([]);
        setSettingsLoading(false);
      }
      return;
    }

    const fetchInterestSettings = async () => {
      setSettingsLoading(true);
      try {
        const docRef = doc(db, "userNewsSettings", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.topics && Array.isArray(data.topics)) {
            const selectedValues = data.topics
              .filter((topic: any) => topic.selected)
              .map((topic: any) => topic.value as StandardCategory);

            setSelectedStandardCategories(selectedValues);
          } else {
            setSelectedStandardCategories([]);
          }
        } else {
          setSelectedStandardCategories([]);
        }
      } catch {
        setSelectedStandardCategories([]);
      } finally {
        setSettingsLoading(false);
      }
    };

    fetchInterestSettings();
  }, [user, authLoading, db]);

  const { data: allFetchedNews = [], isLoading: newsLoading } = useFetchNews(
    selectedStandardCategories,
  );

  if (authLoading || settingsLoading || newsLoading) {
    return <div>뉴스 불러오는 중...</div>;
  }

  return (
    <Container
      sx={{ pt: theme.customSpacing.pagePaddingTop, pb: theme.customSpacing.pagePaddingBottom }}
    >
      {selectedStandardCategories.length === 0 ? (
        <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
          관심 뉴스 설정을 해주세요.
        </Typography>
      ) : (
        selectedStandardCategories.map((standardCategoryName) => {
          const itemsForCategory = allFetchedNews.filter(
            (item) => item.category === standardCategoryName,
          );
          const sectionTitle = newsSectionsDisplayMap[standardCategoryName] || standardCategoryName;

          if (itemsForCategory.length > 0) {
            return (
              <NewsSection
                key={standardCategoryName}
                title={sectionTitle}
                items={itemsForCategory}
              />
            );
          }
          return null;
        })
      )}
    </Container>
  );
}
