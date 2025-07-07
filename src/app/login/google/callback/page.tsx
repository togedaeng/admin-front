"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../hooks/useAuth";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // URL에서 authorization code 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");
        
        if (error) {
          setError("로그인 중 오류가 발생했습니다.");
          setIsLoading(false);
          return;
        }

        if (!code) {
          setError("인증 코드를 받지 못했습니다.");
          setIsLoading(false);
          return;
        }

        // 백엔드로 authorization code 전송
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth/google`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ 
            code: code,
            redirectUri: `http://localhost:3000/login/google/callback`
          }),
        });

        if (response.status === 200) {
          // 기존 회원 - JWT 토큰 받음
          const tokenData = await response.json();
          localStorage.setItem('auth_token', tokenData.accessToken);
          await checkAuth();
          router.push('/'); // 메인 페이지로 이동
        } else if (response.status === 202) {
          // 신규 회원 - 추가 정보 입력 필요
          const userInfo = await response.json();
          localStorage.setItem('tempUserInfo', JSON.stringify(userInfo));
          router.push('/signup'); // 회원가입 페이지로 이동
        } else {
          setError("로그인 처리 중 오류가 발생했습니다.");
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError("로그인 처리 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    handleOAuthCallback();
  }, [router, checkAuth]);

  if (isLoading) {
    return <div>구글 로그인 처리 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return <div>로그인 처리 중...</div>;
} 