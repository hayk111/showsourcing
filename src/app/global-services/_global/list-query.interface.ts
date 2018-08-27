import { DocumentNode } from "graphql";
import { Observable } from "rxjs";
import { QueryRef } from "apollo-angular";
import { SelectParamsConfig } from "~global-services/_global/select-params";


export interface ListQuery<T> {
	queryName: string;
	queryRef: QueryRef<any, any>;
	items$: Observable<T[]>;
	fetchMore: (skip: number) => void;
	refetch: (params: SelectParamsConfig) => void;
}
