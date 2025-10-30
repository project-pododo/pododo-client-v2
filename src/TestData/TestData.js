// 테스트를 위한 더미 데이터
export const initialCalendarEvents = [
  { id: "1", title: "회의", date: "2025-10-15", type: "Etype", status: "미완료", statusID: "incomplete" },
  { id: "2", title: "업무 마감", date: "2025-10-18", type: "Atype", status: "생성", statusID: "created" },
  { id: "3", title: "운동", date: "2025-10-23", type: "Btype", status: "생성", statusID: "created" },
  { id: "4", title: "외부 미팅", date: "2025-10-28", type: "Dtype", status: "보류", statusID: "pause" },
  { id: "5", title: "기획서 작성", date: "2025-10-23", type: "Ctype", status: "완료", statusID: "done" },
  { id: "6", title: "집중개발", date: "2025-10-23", type: "Ctype", status: "생성", statusID: "created"},
  { id: "7", title: "회의", date: "2025-10-25", type: "Etype", status: "생성", statusID: "created" },
  { id: "8", title: "업무 시작", date: "2025-10-28", type: "Atype", status: "생성", statusID: "created" },
  { id: "9", title: "회의", date: "2025-10-30", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "14", title: "집중개발", date: "2025-10-30", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "13", title: "운동", date: "2025-10-30", type: "Btype", status: "미완료", statusID: "incomplete" },
  { id: "10", title: "미팅", date: "2025-10-28", type: "Dtype", status: "보류", statusID: "pause" },
  { id: "11", title: "업무마감", date: "2025-10-31", type: "Ctype", status: "생성", statusID: "created" },
  { id: "12", title: "회의서 작성", date: "2025-10-29", type: "Ctype", status: "생성", statusID: "created"},
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