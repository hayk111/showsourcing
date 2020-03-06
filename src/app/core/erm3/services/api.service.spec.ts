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
import { switchMap } from 'rxjs/operators';

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

	// /** ======== */
	// /** queryAll */
	// /** ======== */

	// const expectQuerySomething = done => ({
	// 	next: d => {
	// 		expect(d).toBeTruthy();
	// 		done();
	// 	},
	// 	error: err => {
	// 		fail(err);
	// 		done();
	// 	}
	// });

	// // entities not custom implemented :
	// const notCustomQueryAll = [
	// 	'category',
	// 	'company',
	// 	'contact',
	// 	'descriptor',
	// 	'image',
	// 	'product',
	// 	'supplier',
	// 	'task',
	// 	'user'
	// 	// 'teamByUser'
	// ];
	// // test queryAll (not custom) for all entities in the QueryPool.map
	// notCustomQueryAll.forEach(entity => {
	// 	it(`should query something with queryAll for "${entity}"`, done => {
	// 		apiSrv
	// 			.queryAll(entity as EntityName)
	// 			.data$.pipe(first())
	// 			.subscribe(expectQuerySomething(done));
	// 	});
	// });



	/** ======== */
	/** QUERY BY */
	/** ======== */


	// fit('should query all teams by user', async done => {
	// 	apiSrv.queryBy<models.TeamUser>('TeamUser', 'User').data$.subscribe(d => {debugger});
	// });
	// it('should query all companies by owner', async done => {
	// 	apiSrv
	// 		.queryBy<models.Company>('Company', 'Owner', { variables: { ownerUserId: userId } })
	// 		.data$.subscribe(d => {
	// 			debugger;
	// 		});
	// });
});
