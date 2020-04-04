import { MutationOptions, WatchQueryOptions } from 'apollo-client';
import { log } from '~utils/log';
import { GqlHelper } from './_gql-helper.class';

/** colors */
const COLOR_QUERY = 'color: gold; background: #3b2d44; padding: 4px';
const COLOR_MUTATION = 'color: gold; background: #3b2d44; padding: 4px';
const COLOR_QUERY_RESPONSE = 'color: pink; background: #3b2d44; padding: 4px';
const COLOR_MUTATION_RESPONSE = 'color: pink; background: #3b2d44; padding: 4px';

/**
 * Helps with the logging of api query / response
 */
export class ApiLogger {

	/** logs request that is about to being made to the 	 */
	static logRequest(options: WatchQueryOptions | MutationOptions) {
		// logging for each request
		const { queryName, variables, body, isMutation } = GqlHelper.getQueryInfo(options);
		const color = isMutation ? COLOR_MUTATION : COLOR_QUERY;
		log.group(`%c 🍌 ${queryName}`, color);
		log.group(`%c trace`, 'color: orange');
		log.trace();
		log.groupEnd();
		log.group(`%c gql`, 'color: fuchsia;');
		log.debug(`%c ${body}`, 'color: #555555');
		log.groupEnd();
		if (variables) {
			log.group(`%c variables`, 'color: lime');
			log.table(variables);
			log.groupEnd();
		}
		log.groupEnd();
	}

	/** logs data received  */
	static logResponse(options, result) {
		const { queryName, isMutation } = GqlHelper.getQueryInfo(options);
		const color = isMutation ? COLOR_MUTATION_RESPONSE : COLOR_QUERY_RESPONSE;
		log.group(`%c 🍇 ${queryName} -- Result`, color);
		log.table((result && result.items) || result);
		log.groupEnd();
	}
}
