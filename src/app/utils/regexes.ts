

// regex for inputs
export enum RegexpApp {
	/* Restrict Inputs */
	DIGITS = '^\\d+$',
	// tslint:disable-next-line:max-line-length
	URL = '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
	PHONE = '^[0-9\\.\\-\\/\\+\\s()]+$',
	// tslint:disable-next-line: quotemark tslint:disable-next-line: max-line-length
	EMAIL = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
	// This expression allows only sites like com, gov, etc
	// tslint:disable-next-line: max-line-length
	// [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b
	DECIMAL = '[0-9\\.\\,]+',
	// PASSWORD_INPUT: '^[a-zA-Z0-9!@#$%^&*-.,?+]$',

	/* Pattern Validators */
	// Password musn't have a space
	PASSWORD_SPACE = '^[^\ ]{1,}$',
	// Password must have a number (?=.*[0-9]), and length from 6 to 20, // Used for validation
	// PASSWORD = '^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*-.,?+]{6,20}$'
}

