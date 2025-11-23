const getHelloMessage = () => {
  const time = new Date();
  const targetTimezone = "Asia/Ho_Chi_Minh";

  // Get the hour in the target timezone
  const hour = parseInt(
    time.toLocaleString("en-US", {
      timeZone: targetTimezone,
      hour: 'numeric',
      hour12: false
    })
  );

  console.log(`Current hour in ${targetTimezone}: ${hour}`);

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