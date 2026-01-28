import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Divider, Card } from "antd";
import styles from "../../css/LoginPage.module.css";

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
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <h2 className={styles.title}>
          서비스 시작하기
          <img
            src="/images/icon-grapes.png"
            alt="logo"
            className={styles.logoImage}
          />
        </h2>
        <p className={styles.subtitle}>나만의 캘린더를 관리해 보세요</p>

        <Divider />

        <div className={styles.googleWrapper}>
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

        <Divider plain className={styles.emailDivider}>
          또는 이메일로 로그인
        </Divider>

        <p
          className={styles.signupLink}
          onClick={() => alert("준비 중인 서비스입니다.")}
        >
          계정이 없으신가요? 가입하기
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
