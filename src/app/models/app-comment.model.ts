import { BaseEntity } from './_entity.model';


export class AppComment extends BaseEntity<AppCommentConfig> {
	message?: string;
}

export interface AppCommentConfig {
	message: string;
}
