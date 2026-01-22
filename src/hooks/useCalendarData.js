import { useMemo } from "react";
import dayjs from "dayjs";
import { statusColors } from "../TestData/TestData";

export const useCalendarData = (events) => {
  return useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");

    const dailyList = events.filter((event) => event.date === today);

    const statusCount = events.reduce((acc, event) => {
      const statusKey = event.status || "미생성";
      acc[statusKey] = (acc[statusKey] || 0) + 1;
      return acc;
    }, {});

    const rawStatusData = Object.entries(statusCount).map(([key, value]) => ({
      id: key,
      value,
      color: statusColors[key] || "#ddd",
    }));

    const donutData = rawStatusData.filter((d) => d.id !== "미생성");

    const desiredOrder = ["생성", "보류", "미완료", "완료", "미생성"];
    const waffleData = [...rawStatusData].sort(
      (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id)
    );

    return { dailyList, donutData, waffleData };
  }, [events]);
};
