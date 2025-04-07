import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // 프록시를 사용하므로 상대 경로 사용
  headers: {
    "Content-Type": "application/json",
    Authorization: "pododo!12",
  },
  withCredentials: false, // 프록시 사용 시 credentials는 보통 필요 없음
});

export const getTestData = async () => {
  try {
    const response = await api.get("/todo/test");
    return response.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};
