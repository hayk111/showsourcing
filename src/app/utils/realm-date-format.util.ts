

export const toRealmDateFormat = (date: Date) => {
	return date.toISOString().replace('T', '@');
};
