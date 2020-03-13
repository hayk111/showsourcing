import { ObservableQuery as ApolloObservableQuery } from 'aws-appsync/node_modules/apollo-client';
import { Observable } from 'rxjs';

export interface ObservableQuery<T = any> extends ApolloObservableQuery<T> {
	response$: Observable<any>;
	data$: Observable<T>;
	count$?: Observable<number>;
	queryName: string;
}
