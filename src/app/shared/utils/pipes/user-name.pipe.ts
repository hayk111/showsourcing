import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUserName'
})
export class UserNamePipe implements PipeTransform {

	transform(userData: any, args?: any): any {
		return userData && this.hasFirstAndLastNamesDefined(userData) ?
			`${userData.firstName} ${userData.lastName.charAt(0).toUpperCase()}.` :
			'';
	}

	hasFirstAndLastNamesDefined({ firstName, lastName }) {
		return (firstName && lastName);
	}
}
