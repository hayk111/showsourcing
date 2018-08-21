import { DocumentNode } from "graphql";
import { Observable } from "rxjs";
import { QueryRef } from "apollo-angular";


export interface SelectListResult<T> {
	queryName: string;
	queryRef: QueryRef<any, any>;
	items$: Observable<T[]>;
	fetchMore: (skip: number) => void;
}
