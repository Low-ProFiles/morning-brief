import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '..//config/getCurrentUser';

import './mypage.css';


export default function MyPage() {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const menuList = [
  { label: '내 정보 관리', path: '/mypage/info' },
  { label: '관심 뉴스 설정', path: '/mypage/news' },
  { label: '알림 설정', path: '/mypage/notification' },
  { label: '회원 탈퇴', path: '/mypage/withdraw' }
];


  return (
    <div className="mypage-container">
      <h2 className="mypage-title">
        {user?.displayName ? `${user.displayName} 님` : '로그인 중...'}
      </h2>
      <div className="menu-box">
        {menuList.map((item, idx) => (
          <div
            key={idx}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <span>{item.label}</span>
            <span>{'>'}</span>
          </div>
        ))}
      </div>
      <button className="logout-button">로그아웃</button>
    </div>
  );
}
