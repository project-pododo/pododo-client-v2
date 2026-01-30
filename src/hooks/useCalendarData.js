import { useMemo } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { statusColors } from "../TestData/TestData";

dayjs.extend(isBetween);

export const useCalendarData = (events) => {
  return useMemo(() => {
    const today = dayjs().startOf("day");
    const activeEvents = events.filter((event) => event.statusID !== "deleted");
    const dailyList = activeEvents.filter((event) => {
      const startDate = dayjs(event.start).startOf("day");
      const endDate = dayjs(event.end || event.start).endOf("day");

      return today.isBetween(startDate, endDate, "day", "[]");
    });

    const statusCount = activeEvents.reduce((acc, event) => {
      const statusKey = event.status || "미생성"; 
      acc[statusKey] = (acc[statusKey] || 0) + 1;
      return acc;
    }, {});

    const rawStatusData = Object.entries(statusCount).map(([key, value]) => ({
      id: key,
      label: key,
      value,
      color: statusColors[key] || "#4ECDC4",
    }));

    const donutData = rawStatusData.filter((d) => d.id !== "미생성");

    const desiredOrder = ["생성", "보류", "미완료", "완료", "미생성"];
    const waffleData = [...rawStatusData].sort(
      (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id)
    );

    return { dailyList, donutData, waffleData };
  }, [events]);
};