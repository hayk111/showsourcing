/** AWS CONFIGURATION START */
import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import Amplify from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService, TeamService } from '~core/auth';
import awsconfig from '~core/aws-exports';
import { Typename } from '../typename.type';

import * as models from '~core/erm3/models';
import { ApiService } from './api.service';
import { ImageType } from '../API.service';
import { switchMap, first } from 'rxjs/operators';
import { QueryPool } from '../queries/query-pool.class';

Amplify.configure(awsconfig);

const mocks = {
	Category: () => new models.Category({ name: 'test apiService Category' }),
	Contact: () => new models.Contact({ name: 'test apiService Contact' }),
	// Descriptor: () => new models.Descriptor({ target: 'test apiService Descriptor' }),
	Image: () =>
		new models.Image({ fileName: 'File Name', orientation: 0, imageType: ImageType.PNG }),
	Product: () => new models.Product({ name: 'test apiService Product' }),
	Supplier: () => new models.Supplier({ name: 'test apiService Supplier' }),
	Task: () => new models.Task({ name: 'test apiService Task' })
};

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;
	let userId: any;

	// connect user for test and provide services
	beforeAll(async () => {
		TestBed.configureTestingModule({
			imports: [RouterModule.forRoot([])],
			providers: [
				AmplifyService,
				AuthenticationService,
				ApiService,
				{ provide: APP_BASE_HREF, useValue: '/' },
				TeamService
			]
		});

		apiSrv = TestBed.get(ApiService);
		authSrv = TestBed.get(AuthenticationService);
		TeamService.teamSelected = new models.Team({ id: '1e86fa2c-9daa-429c-9e3a-43a85a32297c' });
		const user = await authSrv.signIn({
			username: 'cedric@showsourcing.com',
			password: 'Test1234'
		});
		userId = user.username;
	});

	it('should create entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.toPromise()
				.catch(e => fail(`entity ${name} failed creation: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	it('should queryOne entities', async () => {});

	it('should queryMany entities', async () => {});

	it('should update entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.pipe(switchMap(createdEntity => apiSrv.update(name as Typename, { ...createdEntity })))
				.toPromise()
				.catch(e => fail(`entity ${name} failed udpate: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	it('should delete entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.pipe(switchMap(createdEntity => apiSrv.delete(name as Typename, createdEntity)))
				.toPromise()
				.catch(e => fail(`entity ${name} failed delete: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	/** ========= */
	/** QUERY ONe */
	/** ========= */

	it('should query each entity', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.pipe(switchMap(createdEntity => apiSrv.queryOne(name as Typename, createdEntity.id).data$))
				.toPromise()
				.catch(e => fail(`entity ${name} failed queryOne: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	/** ======== */
	/** QUERY BY */
	/** ======== */

	fit('should query all by entity', async () => {
		// get all queries by from query-pool => [ [typename1, byTypename1], ...]
		const collectQueryBy = [];
		Object.entries(QueryPool.map).forEach(([typename, baseQuery]: any) => {
			if (!baseQuery.queryBy) return;
			Object.keys(baseQuery.queryBy).forEach(byTypename => {
				collectQueryBy.push([typename, byTypename]);
			});
		});

		// run queries into promises
		const promises = collectQueryBy.map(([typename, byTypename]) => {
			return apiSrv
				.queryBy(typename as Typename, byTypename, 'fakeId')
				.data$.pipe(first()).toPromise()
				.catch(e => fail(`entity ${typename} failed query by ${byTypename}: ${e}`));
		});

		// test results
		if (!promises.length) fail('there is no call "queryBy"');
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

});
