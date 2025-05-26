import useCurrentUser from '../config/getCurrentUser';
import './mypage.css';

type User = {
  email?: string;
  displayName?: string;
};

export default function MyInfo() {
  const user: User = useCurrentUser();

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">내 정보 관리</h2>
      <div className="info-box">
        <div className="info-row">
          <span>이메일</span>
          <span>{user?.email ?? '정보 없음'}</span>
        </div>
        <div className="info-row">
          <span>이름</span>
          <span>{user?.displayName ?? '정보 없음'}</span>
        </div>
      </div>
    </div>
  );
}
