

// regex for inputs
export enum RegexpApp {
	DIGITS = '^\\d+$',
	// tslint:disable-next-line:max-line-length
	URL = '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
	PHONE = '^[0-9\\.\\-\\/\\+\\s()]+$',
	DECIMAL = '[0-9\\.\\,]+',
	// You only can type a numbers, letters and some special characters
	PASSWORD_INPUT = '^[a-zA-Z0-9!@#$%^&*-.,?+]$',
	// Password must have a number (?=.*[0-9]), and length from 6 to 20
	PASSWORD = '^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*-.,?+]{6,20}$'
}

