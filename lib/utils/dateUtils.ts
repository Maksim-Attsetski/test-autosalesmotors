type TDate = string | Date | number;

class DateUtils {
  parseDate<R = Date>(date: TDate = new Date(), expect: "date" | "string" = "date"): R {
    const newDate = new Date(date);
    if (expect === "date") return newDate as R;
    return newDate.toLocaleDateString("ru") as R;
  }

  getSecondForExpire(date: TDate): number {
    const currentDate = new Date();
    const expiry = this.parseDate(date);
    const timeDifference = expiry.getTime() - currentDate.getTime();

    // Если дата истечения в прошлом, возвращаем сразу 0 дней
    if (timeDifference < 0) {
      return 0;
    }

    const secondsRemaining = Math.ceil(timeDifference / 1000);
    return secondsRemaining; // (24 * 60 * 60);
  }

  getDate(date: TDate, monthFormat: Intl.DateTimeFormatOptions["month"] = "long") {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: monthFormat,
      year: "numeric",
    } as Intl.DateTimeFormatOptions);
  }

  isDateValid = (date: Date) => {
    if (!date) return false;

    const currentYear = new Date().getFullYear();
    return date.getFullYear() >= currentYear - 70 && date.getFullYear() <= currentYear;
  };
}

export const dateUtils = new DateUtils();
