import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { DocumentNode } from 'graphql';


export interface RefetchParams {
	query: DocumentNode;
	variables?: any;
}