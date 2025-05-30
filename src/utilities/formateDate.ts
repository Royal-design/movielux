import { format } from "date-fns";

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  return format(date, "dd MMM. yyyy");
}
