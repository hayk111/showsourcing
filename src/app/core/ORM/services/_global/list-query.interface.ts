import { Observable, ConnectableObservable } from 'rxjs';
import { SelectParamsConfig } from '~core/orm/services/_global/select-params';


export interface ListQuery<T> {
	queryName: string;
	items$: ConnectableObservable<T[]>;
	count$: Observable<number>;
	fetchMore: () => Observable<any>;
	refetch: (params: SelectParamsConfig) => Observable<any>;
}
