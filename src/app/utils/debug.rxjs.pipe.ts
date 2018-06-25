import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';

export const debug: MonoTypeOperatorFunction<any> = tap(d => { debugger; });
