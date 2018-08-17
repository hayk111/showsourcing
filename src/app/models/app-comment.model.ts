import { BaseEntity } from '~models/_entity.model';


export class AppComment extends BaseEntity<AppCommentConfig> implements AppCommentConfig {
	text: string;
}

export interface AppCommentConfig {
	text: string;
}
