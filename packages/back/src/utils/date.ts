export const date = () => {
	const now = new Date();
	const currentMinute = now.getMinutes();
	const currentHour = now.getHours();
	const currentDay = now.getDate();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();
	const toLocalTime = now.toLocaleTimeString();
	return {
		today: new Date(`${currentYear}-${currentMonth + 1}-${currentDay}`),
		currentHour,
		currentMinute,
		currentDayStr: `${currentYear}-${currentMonth + 1}-${currentDay}`,
		toLocalTime,
	};
};
