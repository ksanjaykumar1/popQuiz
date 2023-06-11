// The will return today and tomorrow date at beginnning of the day
//  will be used to get mongo documents for current day
const getTodayAndTomorrowDate = () => {
  const today = new Date();

  // Set the time to the beginning of the day
  today.setHours(0, 0, 0, 0);

  // Set the time to the end of the day
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return { today, tomorrow };
};

export { getTodayAndTomorrowDate };
