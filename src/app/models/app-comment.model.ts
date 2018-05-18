import { BaseEntity } from './_entity.model';


export class AppComment extends BaseEntity<AppComment>{
	message?: string;
}