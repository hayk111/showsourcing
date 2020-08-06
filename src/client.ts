import { loki, api, state, client, authStatus  } from 'showsourcing-api-lib';
import * as Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter.js';

const idbAdapter = new LokiIndexedAdapter();
const pa = new Loki.LokiPartitioningAdapter(idbAdapter, { paging: true });

authStatus.signin$.subscribe(() => {
	client.init({
		dbConfig: { adapter: pa },
	});
});

window.addEventListener('online', () => state.setOnlineSate(true));
window.addEventListener('offline', () => state.setOnlineSate(false));
