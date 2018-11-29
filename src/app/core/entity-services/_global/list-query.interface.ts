import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { SelectParamsConfig } from '~entity-services/_global/select-params';


export interface ListQuery<T> {
	queryName: string;
	items$: Observable<T[]>;
	fetchMore: (skip: number) => Observable<any>;
	refetch: (params: SelectParamsConfig) => Observable<any>;
}
