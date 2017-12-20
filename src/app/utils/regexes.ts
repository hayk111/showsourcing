
export enum RegexpApp {
	DIGITS = '^\\d+$',
	// tslint:disable-next-line:max-line-length
	URL = '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
	PHONE = '^[0-9\\.\\-\\/\\+\\s()]+$',
	DECIMAL = '[0-9\\.\\,]+'
}

