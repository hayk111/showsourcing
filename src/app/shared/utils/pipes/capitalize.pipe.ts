import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
	transform(s: string, args?: any): any {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
}
