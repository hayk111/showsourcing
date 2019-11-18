import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'timeAgo',
	pure: false
})
export class DateToTimeAgoPipe implements PipeTransform {

	constructor(private translate: TranslateService) { }

	transform(dateData: Date | number, args?: any): any {
		if (dateData === undefined || dateData === null)
			return '';
		const timestamp = Date.parse(dateData.toString());
		const seconds = Math.floor((+new Date() - timestamp) * 0.001);

		if (seconds < 10) {
			return this.translate.instant('time.just-now');
		} else if (seconds < 60) {
			return this.translate.instant('time.second-ago.plural', { num: seconds });
		} else if (seconds < 3600) {
			const minutes = Math.floor(seconds / 60);
			if (minutes > 1)
				return this.translate.instant('time.minute-ago.plural', { num: minutes });
			else
				return this.translate.instant('time.minute-ago.singular', { num: 1 });
		} else if (seconds < 86400) {
			const hours = Math.floor(seconds / 3600);
			if (hours > 1)
				return this.translate.instant('time.hour-ago.plural', { num: hours });
			else
				return this.translate.instant('time.hour-ago.singular', { num: 1 });
		} else if (seconds < 2678400) {
			const days = Math.floor(seconds / 86400);
			if (days > 1)
				return this.translate.instant('time.day-ago.plural', { num: days });
			else
				return this.translate.instant('time.day-ago.singular', { num: 1 });
		} else if (seconds < 31536000) {
			const months = Math.floor(seconds / 2678400);
			if (months > 1)
				return this.translate.instant('time.month-ago.plural', { num: months });
			else
				return this.translate.instant('time.month-ago.singular', { num: 1 });
		} else {
			const years = Math.floor(seconds / 31536000);
			if (years > 1)
				return this.translate.instant('time.year-ago.plural', { num: years });
			else
				return this.translate.instant('time.year-ago.singular', { num: 1 });
		}
	}
}
