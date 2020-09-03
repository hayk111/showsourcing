import { loki, api, state, client, authStatus } from 'showsourcing-api-lib';
import * as Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter.js';
import { LogLevel } from 'showsourcing-api-lib/dist/services';
import { switchMap } from 'rxjs/operators';

const idbAdapter = new LokiIndexedAdapter();
const pa = new Loki.LokiPartitioningAdapter(idbAdapter, { paging: true });

export const initializedClient$ = authStatus.signin$.pipe(
	switchMap(() => {
		return client.init({
			dbConfig: { adapter: pa },
			shouldSync: true,
			logs: {
				logLevel: LogLevel.ALL,
				asyncLogs: true,
			},
		});
	})
);

window.addEventListener('online', () => state.setOnlineSate(true));
window.addEventListener('offline', () => state.setOnlineSate(false));
