import { uuid } from '~utils';

export class EventDescription {
	id: string;
	name: string;
	website?: string;
	startDate?: string;
	endDate?: string;
	countryCode?: string;
	global: boolean;
	supplierCount: number;
	primaryColor?: string;
	secondaryColor?: string;

	constructor(name: string) {
		this.id = uuid();
		this.name = name;
		this.global = false;
		this.supplierCount = 0;
	}
}
