// src/App.tsx
import { Route, Routes } from "react-router-dom";
import MyInfo from "./pages/myInfo";
import MyNews from "./pages/myNews";
import MyPage from "./pages/myPage";
import NotificationComponent from "./pages/notification";
import Login from "./components/login";
import NewsDetail from "./NewsDetail";
import MyMain from "./MyMain";
import Audio from "./audio";
import BottomBar from "./components/BottomBar";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MyMain />
            </PrivateRoute>
          }
        />
        <Route
          path="/news/:id"
          element={
            <PrivateRoute>
              <NewsDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/audio"
          element={
            <PrivateRoute>
              <Audio />
            </PrivateRoute>
          }
        />
        <Route
          path="/mymain"
          element={
            <PrivateRoute>
              <MyMain />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage/info"
          element={
            <PrivateRoute>
              <MyInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage/news"
          element={
            <PrivateRoute>
              <MyNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage/notification"
          element={
            <PrivateRoute>
              <NotificationComponent />
            </PrivateRoute>
          }
        />
      </Routes>
      <BottomBar />
    </>
  );
}
