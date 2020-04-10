import { Observable } from 'rxjs';

export interface DialogRef {
	component: any;
	data$: Observable<any>;
	close$: Observable<void>;
	cancel$: Observable<void>;
}
