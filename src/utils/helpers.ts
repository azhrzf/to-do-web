import humanizeDuration from "humanize-duration";

interface DueDateResult {
  time: string;
  isElapsed: boolean;
}

export function getUniqueTime(): string {
  const date = new Date();
  return date.getTime().toString();
}

function getElapsedTime(dueDate: Date, timeNow: Date): string {
  const elapsedTime = timeNow.getTime() - dueDate.getTime();
  return humanizeDuration(elapsedTime, { largest: 1 });
}

function getRemainingTime(dueDate: Date, timeNow: Date): string {
  const remainingTime = dueDate.getTime() - timeNow.getTime();
  return humanizeDuration(remainingTime, { largest: 1 });
}

export function convertDueDate(dueDate: Date): DueDateResult {
  const timeNow = new Date();
  const isElapsed = timeNow > dueDate;

  return {
    time: isElapsed
      ? getElapsedTime(dueDate, timeNow)
      : getRemainingTime(dueDate, timeNow),
    isElapsed,
  };
}
