
export const realmDateFormat = (date: Date) => {
	const year = date.getFullYear();
	const month = addZero(date.getMonth());
	const day = addZero(date.getDay());
	const hour = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const secs = addZero(date.getSeconds());
	return `${year}-${month}-${day}@${hour}:${minutes}:${secs}`;
};

const addZero = number => number < 9 ? `0${number}` : number;
