import { Todo } from "@/schemas/todo";
import { differenceInCalendarDays, differenceInDays } from "date-fns";

export function sortTodosByDate(todos: Todo[]): Todo[] {
  return todos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.completed) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}

export function getDateDifferenceMessage(isoDateString: string): string {
  const isoDate = new Date(isoDateString);
  const now = new Date();

  const difference = differenceInCalendarDays(isoDate, now);

  if (difference < 0) {
    return `${Math.abs(difference)} Days Overdue`;
  } else if (difference > 0) {
    return `${difference} Days Left`;
  } else {
    return "Today";
  }
}
