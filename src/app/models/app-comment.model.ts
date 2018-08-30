import { EntityWithAudit } from '~models/_entity.model';


export class AppComment extends EntityWithAudit<AppCommentConfig> implements AppCommentConfig {
	text: string;
}

export interface AppCommentConfig {
	text: string;
}
