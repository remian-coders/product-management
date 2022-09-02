export const date = () => {
	const now = new Date();
	const currentSecond = now.getSeconds();
	const currentMinute = now.getMinutes();
	const currentHour = now.getHours();
	const currentDay = now.getDate();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();
	return {
		today: new Date(`${currentYear}-${currentMonth + 1}-${currentDay}`),
		currentDay,
		currentMonth,
		currentYear,
		currentHour,
		currentMinute,
		currentSecond,
		currentDayStr: `${currentYear}-${currentMonth + 1}-${currentDay}`,
	};
};
