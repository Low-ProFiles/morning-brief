// src/components/PrivateRoute.tsx
import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // AuthContext 경로 확인

interface PrivateRouteProps {
  /** 이 컴포넌트로 감쌀 자식 컴포넌트 (실제 페이지 컴포넌트) */
  children: JSX.Element;
  /** 로그아웃 상태일 때 리다이렉트할 경로 (기본값: /login) */
  redirectTo?: string;
}

/**
 * 로그인된 사용자만 접근할 수 있는 라우트를 보호하는 컴포넌트입니다.
 * 로그아웃 상태일 경우 지정된 경로로 리다이렉트합니다.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo = "/login" }) => {
  // AuthContext에서 현재 사용자 정보와 로딩 상태를 가져옵니다.
  const { user, loading } = useAuth();
  // 현재 위치 정보(접근하려던 페이지 경로)를 가져옵니다.
  const location = useLocation();

  // 인증 상태를 확인하는 중일 때 (앱 초기 로딩 등)
  // 로딩이 완료될 때까지 기다립니다. 실제 앱에서는 스피너 등을 보여주는 것이 좋습니다.
  if (loading) {
    return <div>인증 상태 확인 중...</div>;
  }

  // 로딩이 완료되었고, 사용자 정보(user)가 없는 경우 (로그아웃 상태)
  // 지정된 리다이렉트 경로로 이동시킵니다.
  // replace={true} 옵션은 현재 페이지를 히스토리 스택에서 대체하여 뒤로가기 시 로그인 페이지로 돌아오지 않게 합니다.
  // state={{ from: location }}는 로그인 후 원래 접근하려던 페이지로 돌아갈 때 활용할 수 있도록 현재 위치 정보를 넘겨줍니다.
  if (!user) {
    console.log(`로그인되지 않아 ${redirectTo}로 리다이렉트합니다.`);
    return <Navigate to={redirectTo} replace={true} state={{ from: location }} />;
  }

  // 로딩이 완료되었고, 사용자 정보(user)가 있는 경우 (로그인 상태)
  // 원래 접근하려던 자식 컴포넌트(페이지)를 렌더링합니다.
  return children;
};

export default PrivateRoute;
