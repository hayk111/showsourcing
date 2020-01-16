import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams) {
		// since we use nested properties we will use the '.' to get the original translation.
		// This is a quick fix, ultimately translation should be on one level then
		return params.key.split('.').pop();
	}
}
