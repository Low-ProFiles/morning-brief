import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import "./mypage.css";

export default function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuList = [
    { label: "내 정보 관리", path: "/mypage/info" },
    { label: "관심 뉴스 설정", path: "/mypage/news" },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
      navigate("/login");
    } catch (error: any) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">
        {user ? `${user.displayName || user.email} 님` : "로그인 정보 없음"}
      </h2>
      <div className="menu-box">
        {menuList.map((item, idx) => (
          <div key={idx} className="menu-item" onClick={() => navigate(item.path)}>
            <span>{item.label}</span>
            <span>{">"}</span>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
