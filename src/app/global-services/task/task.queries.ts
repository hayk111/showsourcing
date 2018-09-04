import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class TaskQueries extends GlobalQueries {

	static one = `description`;
	static many = `description`;
}
