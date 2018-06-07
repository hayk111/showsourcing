import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class HttpApiRedirectorService implements HttpInterceptor {
	apiUrl = environment.apiUrl;
	signupUrl = environment.signupUrl;

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// only for relative urls we will add the baseUrl
		if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
			const parts = req.url.split('/');
			const target = parts.shift();
			const path = parts.join('/');
			let newReq;
			switch (target) {
				case 'api': newReq = req.clone({ url: `${this.apiUrl}/${path}` }); break;
				case 'signup': newReq = req.clone({ url: `${this.signupUrl}/${path}` }); break;
				default: throw Error(`Wrong target url ${target}`);
			}
			return next.handle(newReq);
		}
		return next.handle(req);
	}
}
