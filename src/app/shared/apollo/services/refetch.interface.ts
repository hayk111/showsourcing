import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';


export interface RefetchParams {
	gql?: any;
	params$?: Observable<SelectParams>;
}