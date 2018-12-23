import { Observable } from 'rxjs';
import { SelectParamsConfig } from '~entity-services/_global/select-params';


export interface ListQuery<T> {
	queryName: string;
	items$: Observable<T[]>;
	fetchMore: () => Observable<any>;
	refetch: (params: SelectParamsConfig) => Observable<any>;
}
