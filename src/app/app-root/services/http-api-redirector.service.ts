import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class HttpApiRedirectorService implements HttpInterceptor {
	baseUrl = environment.apiUrl;

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// only for relative urls we will add the baseUrl
		if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
			const newReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
			if (environment.production) return next.handle(newReq);
		}

		return next.handle(req);
	}
}
