// Function: filterDataByTimePeriod

// Description:
// This function is used to filter an array of data based on different time periods such as today, yesterday, current month, last week, last month, last 30 days, and current year. It takes the data array and a time period as input and returns the filtered data.

// Parameters:
// - data: An array of objects representing the data to be filtered.
// - timePeriod: A string representing the desired time period for filtering the data.

// Returns:
// An array containing the filtered data based on the specified time period.

// Usage Example:
// const filteredData = filterDataByTimePeriod(dataArray, "last month");

// Function to filter data based on time period
export const filterDataByTimePeriod = (data, timePeriod) => {
  // Get current date
  const currentDate = new Date();

  // Get yesterday's date
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get last week's date
  const lastWeek = new Date(currentDate);
  lastWeek.setDate(currentDate.getDate() - 7);

  // Get last month's dates
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );
  const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
  const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  // Get last 30 days' date
  const last30Days = new Date(currentDate);
  last30Days.setDate(currentDate.getDate() - 30);

  // Get first day of current year
  const firstDayOfCurrentYear = new Date(currentDate.getFullYear(), 0, 1);

  switch (timePeriod) {
    // Return all data
    case "all":
      return data;
    // Filter data for today's purchases
    case "today":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate.toDateString() === currentDate.toDateString();
      });
    // Filter data for yesterday's purchases
    case "yesterday":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate.toDateString() === yesterday.toDateString();
      });
    // Filter data for current month's purchases
    case "current month":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
      });
    // Filter data for purchases in the last week
    case "last week":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= lastWeek && itemDate <= currentDate;
      });
    // Filter data for purchases in the last month
    case "last month":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= firstDayOfLastMonth && itemDate <= lastDayOfLastMonth;
      });
    // Filter data for purchases in the last 30 days
    case "last 30 days":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= last30Days && itemDate <= currentDate;
      });
    // Filter data for purchases in the current year
    case "current year":
      return data.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= firstDayOfCurrentYear && itemDate <= currentDate;
      });
    // Return data for other time periods
    default:
      return data;
  }
};
