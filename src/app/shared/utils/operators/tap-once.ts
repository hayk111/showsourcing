import { Observable, defer } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tapOnce(fn: (value) => void) {
	return (source: Observable<any>) =>
			defer(() => {
					let first = true;
					return source.pipe(
							tap((payload) => {
									if (first) {
											fn(payload);
									}
									first = false;
							})
					);
			});
}
