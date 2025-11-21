const getHelloMessage = () => {
  const time = new Date();
  const targetTimezone = "Asia/Ho_Chi_Minh";
  const formattedTime = time.toLocaleString("vi-VN", { timeZone: targetTimezone });
  const hour = formattedTime.split(", ")[1];
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export const dateTimeUtils = {
  getHelloMessage
}