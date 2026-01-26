import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Divider, Card } from "antd";

const LoginPage = () => {
  const clientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // 실제 연동을 위한 구글 클라이언트 ID 교체 필요

  const onSuccess = (credentialResponse) => {
    console.log("로그인 성공, 유저 정보(토큰):", credentialResponse);
    alert("구글 로그인에 성공했습니다!");
  };

  const onError = () => {
    console.log("로그인 실패");
  };
  // 백엔드 토큰 연동 작업 추가 필요.

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ width: 350, textAlign: "center", borderRadius: 12 }}>
        <h2>
          서비스 시작하기
          <img src="/images/icon-grapes.png" alt="logo" style={{ width: 30 }} />
        </h2>
        <p style={{ color: "#888" }}>나만의 캘린더를 관리해 보세요</p>

        <Divider />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              useOneTap
              shape="pill"
              theme="outline"
            />
          </GoogleOAuthProvider>
        </div>

        <Divider plain style={{ fontSize: "12px", color: "#ccc" }}>
          또는 이메일로 로그인
        </Divider>

        <p
          style={{ fontSize: "13px", cursor: "pointer", color: "#1890ff" }}
          onClick={() => alert("준비 중인 서비스입니다.")}
        >
          계정이 없으신가요? 가입하기
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
