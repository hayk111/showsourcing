import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams) {
		if (params.key.startsWith('_user-defined.')) {
			return params.key.split('.').slice(2).join('.');
		} else {
			return params.key;
		}
	}
}
