// 테스트를 위한 더미 데이터
import dayjs from "dayjs";

const currentYearMonth = dayjs().format("YYYY-MM");

export const initialCalendarEvents = [
  { id: "1", title: "회의", date: `${currentYearMonth}-10`, type: "Etype", status: "미완료", statusID: "incomplete" },
  { id: "2", title: "업무 마감", date: `${currentYearMonth}-19`, type: "Atype", status: "생성", statusID: "created" },
  { id: "3", title: "운동", date: `${currentYearMonth}-23`, type: "Btype", status: "생성", statusID: "created" },
  { id: "4", title: "외부 미팅", date: `${currentYearMonth}-28`, type: "Dtype", status: "보류", statusID: "pause" },
  { id: "5", title: "기획서 작성", date: `${currentYearMonth}-23`, type: "Ctype", status: "완료", statusID: "done" },
  { id: "6", title: "집중개발", date: `${currentYearMonth}-23`, type: "Ctype", status: "생성", statusID: "created" },
  { id: "7", title: "회의", date: `${currentYearMonth}-25`, type: "Etype", status: "생성", statusID: "created" },
  { id: "8", title: "업무 시작", date: `${currentYearMonth}-28`, type: "Atype", status: "생성", statusID: "created" },
  { id: "9", title: "회의", date: `${currentYearMonth}-30`, type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "10", title: "미팅", date: `${currentYearMonth}-28`, type: "Dtype", status: "보류", statusID: "pause" },
  { id: "11", title: "업무마감", date: `${currentYearMonth}-31`, type: "Ctype", status: "생성", statusID: "created" },
  { id: "12", title: "회의서 작성", date: `${currentYearMonth}-29`, type: "Ctype", status: "생성", statusID: "created" },
  { id: "13", title: "프로젝트 B 초기 분석", date: `${currentYearMonth}-05`, type: "Ctype", status: "생성", statusID: "created" },
  { id: "14", title: "월간 재고 보고서 정리", date: `${currentYearMonth}-06`, type: "Atype", status: "완료", statusID: "done" },
  { id: "15", title: "파트너사 미팅 준비", date: `${currentYearMonth}-07`, type: "Btype", status: "보류", statusID: "pause" },
  { id: "16", title: "신규 서비스 UI/UX 검토", date: `${currentYearMonth}-08`, type: "Dtype", status: "미완료", statusID: "incomplete" },
  { id: "17", title: "개발 환경 설정 및 테스트", date: `${currentYearMonth}-10`, type: "Etype", status: "생성", statusID: "created" },
  { id: "18", title: "광고 캠페인 성과 측정", date: `${currentYearMonth}-11`, type: "Ctype", status: "완료", statusID: "done" },
  { id: "19", title: "법률 자문 회신 대기", date: `${currentYearMonth}-12`, type: "Atype", status: "보류", statusID: "pause" },
  { id: "20", title: "주요 고객 피드백 정리", date: `${currentYearMonth}-13`, type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "21", title: "보안 정책 업데이트 계획", date: `${currentYearMonth}-14`, type: "Dtype", status: "생성", statusID: "created" },
  { id: "22", title: "연초 결산 자료 준비", date: `${currentYearMonth}-17`, type: "Etype", status: "완료", statusID: "done" },
  { id: "23", title: "집중개발", date: `${currentYearMonth}-30`, type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "24", title: "운동", date: `${currentYearMonth}-30`, type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "25", title: "중장기 프로젝트 기획", start: `${currentYearMonth}-02`, end: `${currentYearMonth}-05`, type: "Atype", status: "생성", statusID: "created" },
  { id: "26", title: "신입 사원 교육", start: `${currentYearMonth}-12`, end: `${currentYearMonth}-15`, type: "Btype", status: "보류", statusID: "pause" },
  { id: "27", title: "서버 마이그레이션", start: `${currentYearMonth}-18`, end: `${currentYearMonth}-19`, type: "Dtype", status: "미완료", statusID: "incomplete" },
  { id: "28", title: "디자인 시스템 리뉴얼", start: `${currentYearMonth}-20`, end: `${currentYearMonth}-24`, type: "Ctype", status: "생성", statusID: "created" },
  { id: "29", title: "제주도 워크샵", start: `${currentYearMonth}-26`, end: `${currentYearMonth}-28`, type: "Etype", status: "완료", statusID: "done" },
  { id: "30", title: "분기 성과 검토", start: `${currentYearMonth}-01`, end: `${currentYearMonth}-04`, type: "Atype", status: "생성", statusID: "created" }
];
// .map(event => ({
//   ...event,
//   start: event.date,
//   end: event.date
// }));

export const statusColors = {
  미완료: "rgb(251, 180, 174)",
  보류: "rgb(222, 203, 228)",
  생성: "rgb(179, 205, 227)",
  완료: "rgb(204, 235, 197)",
  미생성: "rgb(241, 243, 245)",
};

export const eventColorMap = {
  Atype: "#ba68c8", // 기본 보라
  Btype: "#4ECDC4", // 민트
  Ctype: "#FFD93D", // 노랑
  Dtype: "#1A535C", // 딥 블루
  Etype: "#FF6B6B", // 빨강
};