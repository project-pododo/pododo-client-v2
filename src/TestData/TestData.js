// 테스트를 위한 더미 데이터
export const initialCalendarEvents = [
  { id: "1", title: "회의", date: "2026-01-10", type: "Etype", status: "미완료", statusID: "incomplete" },
  { id: "2", title: "업무 마감", date: "2026-01-19", type: "Atype", status: "생성", statusID: "created" },
  { id: "3", title: "운동", date: "2026-01-23", type: "Btype", status: "생성", statusID: "created" },
  { id: "4", title: "외부 미팅", date: "2026-01-28", type: "Dtype", status: "보류", statusID: "pause" },
  { id: "5", title: "기획서 작성", date: "2026-01-23", type: "Ctype", status: "완료", statusID: "done" },
  { id: "6", title: "집중개발", date: "2026-01-23", type: "Ctype", status: "생성", statusID: "created"},
  { id: "7", title: "회의", date: "2026-01-25", type: "Etype", status: "생성", statusID: "created" },
  { id: "8", title: "업무 시작", date: "2026-01-28", type: "Atype", status: "생성", statusID: "created" },
  { id: "9", title: "회의", date: "2026-01-30", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "10", title: "미팅", date: "2026-01-28", type: "Dtype", status: "보류", statusID: "pause" },
  { id: "11", title: "업무마감", date: "2026-01-31", type: "Ctype", status: "생성", statusID: "created" },
  { id: "12", title: "회의서 작성", date: "2026-01-29", type: "Ctype", status: "생성", statusID: "created"},
  { id: "13", title: "프로젝트 B 초기 분석", date: "2026-01-05", type: "Ctype", status: "생성", statusID: "created" },
  { id: "14", title: "월간 재고 보고서 정리", date: "2026-01-06", type: "Atype", status: "완료", statusID: "done" },
  { id: "15", title: "파트너사 미팅 준비", date: "2026-01-07", type: "Btype", status: "보류", statusID: "pause" },
  { id: "16", title: "신규 서비스 UI/UX 검토", date: "2026-01-08", type: "Dtype", status: "미완료", statusID: "incomplete" },
  { id: "17", title: "개발 환경 설정 및 테스트", date: "2026-01-10", type: "Etype", status: "생성", statusID: "created" },
  { id: "18", title: "광고 캠페인 성과 측정", date: "2026-01-11", type: "Ctype", status: "완료", statusID: "done" },
  { id: "19", title: "법률 자문 회신 대기", date: "2026-01-12", type: "Atype", status: "보류", statusID: "pause" },
  { id: "20", title: "주요 고객 피드백 정리", date: "2026-01-13", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "21", title: "보안 정책 업데이트 계획", date: "2026-01-14", type: "Dtype", status: "생성", statusID: "created" },
  { id: "22", title: "연초 결산 자료 준비", date: "2026-01-17", type: "Etype", status: "완료", statusID: "done" },
  { id: "23", title: "집중개발", date: "2026-01-30", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "24", title: "운동", date: "2026-01-30", type: "Btype", status: "미완료", statusID: "incomplete" }
];

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