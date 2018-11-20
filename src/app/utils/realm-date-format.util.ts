
const addZero = number => number < 9 ? `0${number}` : number;

export const realmDateFormat = (date: Date) => {
	const year = date.getFullYear();
	const month = addZero(date.getMonth() + 1);
	const day = addZero(date.getDate()); // for some reason date == day, and getDay() gets the name of the day
	const hour = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const secs = addZero(date.getSeconds());
	return `${year}-${month}-${day}@${hour}:${minutes}:${secs}`;
};
