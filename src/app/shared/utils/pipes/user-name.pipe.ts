import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUserName'
})
export class UserNamePipe implements PipeTransform {

	// args -> true/false, default: false. Determine if we show the full name or just abreviation
	transform(userData: any, args?: any): any {
		const fullLastName = args || false;
		const hasNames = userData && this.hasFirstAndLastNamesDefined(userData);
		let formated = '';
		if (fullLastName && hasNames)
			formated = `${userData.firstName} ${userData.lastName}`;
		else if (hasNames)
			formated = `${userData.firstName} ${userData.lastName.charAt(0).toUpperCase()}.`;
		return formated;
	}

	hasFirstAndLastNamesDefined({ firstName, lastName }) {
		return (firstName && lastName);
	}
}
