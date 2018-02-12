import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timeAgo'
})
export class DateToTimeAgoPipe implements PipeTransform {

	transform(dateData: Date | number, args?: any): any {
		if (dateData === undefined || dateData === null)
			return '';
		const timestamp = +dateData;
		const seconds = Math.floor((+new Date() - timestamp) * 0.001);

		if (seconds < 10) {
				return 'just now';
		} else if (seconds < 60) {
				return seconds + ' seconds ago';
		} else if (seconds < 3600) {
				const minutes = Math.floor(seconds / 60);
				if (minutes > 1)
						return minutes + ' minutes ago';
				else
						return '1 minute ago';
		} else if (seconds < 86400) {
				const hours = Math.floor(seconds / 3600);
				if (hours > 1)
						return hours + ' hours ago';
				else
						return '1 hour ago';
		} else if (seconds < 2678400) {
				const days = Math.floor(seconds / 86400);
				if (days > 1)
						return days + ' days ago';
				else
						return '1 day ago';
		} else if (seconds < 31536000) {
				const months = Math.floor(seconds / 2678400);
				if (months > 1)
						return months + ' months ago';
				else
						return '1 month ago';
		} else {
				const years = Math.floor(seconds / 31536000);
				if (years > 1)
						return years + ' years ago';
				else
						return '1 year ago';
		}
	}
}
