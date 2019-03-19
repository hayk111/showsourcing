export class AuthFormElement {
	label?: string;
	type?: 'email' | 'password' | 'username' | 'tel' | 'text';
	name?: string;
	isRequired?: boolean;
	autoComplete?: string;
	placeHolder?: string;
	validators: any[];
	error?: any;
	hint?: string;
}
export class AuthFormButton {
	label?: string;
	type?: 'button' | 'link';
	link?: any;
	queryParams?: string;
}
