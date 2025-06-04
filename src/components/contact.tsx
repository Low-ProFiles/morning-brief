// src/components/contact.jsx
//git 연습 
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // 'useHistory' 대신 'useNavigate'
import Header from './header';

const Contact = ({ auth }) => {
  const navigate = useNavigate();

  // 로그아웃 기능
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);
  
  //로그인 상태 확인
  useEffect(() => {
    auth.onAuthChange((user) => {
      if (!user) {
        navigate('/');
      }
    });
  }, [auth, navigate]);
  

  return (
    <section>
      <Header onLogout={onLogout} />
    </section>
  );
};

export default Contact;