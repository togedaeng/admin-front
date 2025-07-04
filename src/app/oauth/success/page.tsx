"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOAuthSuccess = () => {
      try {
        const accessToken = searchParams.get('accessToken');
        // const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
          setError("OAuth 로그인 중 오류가 발생했습니다.");
          setIsProcessing(false);
          return;
        }

        if (!accessToken) { // refresh token 추가되어 있었음 
          setError("토큰을 받지 못했습니다.");
          setIsProcessing(false);
          return;
        }

        // 토큰을 localStorage에 저장
        localStorage.setItem('auth_token', accessToken);
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);

        // 메인 페이지로 리디렉트
        router.push('/');
      } catch (err) {
        console.error('OAuth success processing error:', err);
        setError("로그인 처리 중 오류가 발생했습니다.");
        setIsProcessing(false);
      }
    };

    processOAuthSuccess();
  }, [router, searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">오류 발생</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
} 