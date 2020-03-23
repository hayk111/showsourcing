import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { HelperType } from '../../../../../generated/API.service';

export class Constant extends Entity<Constant> {
	__typename?: Typename = 'Constant';
	id?: string;
	helperType?: HelperType;
	code?: string;
	label?: string;
}
