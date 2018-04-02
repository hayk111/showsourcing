import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '~app/features/user/services/user.service';
import { Patch } from '~app/entity/utils';

@Injectable()
export class UserHttpService {

	constructor(private http: HttpClient, private userSrv: UserService) { }


	load() {
		return this.http.get('api/user');
	}

	patch(patch: Patch) {
		return this.http.patch(`api/user/${this.userSrv.userId}`, { [patch.propName]: patch.value });
	}
}
