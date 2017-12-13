import { EntityTarget } from '../../store/utils/entities.utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';



@Injectable()
export class FileService {
	constructor(private http: HttpClient) {}

	load(target: EntityTarget) {
		const obs = [];
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		obs.push(this.http.get(`api/${name}/${id}/attachment`));
		obs.push(this.http.get(`api/${name}/${id}/image`));
		return forkJoin(obs);
	}
}
