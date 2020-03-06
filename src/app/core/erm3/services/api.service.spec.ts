/** AWS CONFIGURATION START */
import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import Amplify from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService, TeamService } from '~core/auth';
import awsconfig from '~core/aws-exports';
import { Typename } from '../entity-name.type';

import * as models from '~core/erm3/models';
import { ApiService } from './api.service';

Amplify.configure(awsconfig);

const mocks = {
	Category:  () => new models.Category({ name: 'test apiService Category' }),
	Contact: () => new models.Contact({ name: 'test apiService Contact' }),
	// Descriptor: () => new models.Descriptor({ target: 'test apiService Descriptor' }),
	// Image: () => new models.Image({ fileName: 'File Name', orientation: 0 }),
	// Product: () => new models.Product({ name: 'test apiService Product' }),
	// Supplier: () => new models.Supplier({ name: 'test apiService Supplier' }),
	// Task: () => new models.Task({ name: 'test apiService Task' })
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
		const user = await authSrv.signIn({ username: 'cedric@showsourcing.com', password: 'Test1234' });
		userId = user.username;

		// TODO maybe use an hard coded team & company here instead
		const companyInput =  new models.Company({ name: 'test apiService Company' });
		const company = await apiSrv.create('Company', companyInput).toPromise();
		const teamInput = new models.Team({ name: 'test apiService Team', companyId: company.id });
		const team = await apiSrv.create<any>('Team', teamInput).toPromise();
		TeamService.teamSelected = team;
	});



	it('should create entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv.create(name as Typename, getMock()).toPromise();
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	it('should queryOne entities', async () => {

	});

	it('should queryMany entities', async () => {

	});

	it('should delete entities', async () => {

	});

	it('should update entities', async() => {

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




	// /** ================ */
	// /** delete functions */
	// /** ================ */

	// const deleteCategory = (entity: Entity, entityName: EntityName) => {
	// 	return apiSrv.delete(entityName, entity);
	// };




	// // it('should generate 100 products', () => {
	// // 	for (let i = 0; i < 100; i++) {
	// // 		const product = new models.Product({
	// // 			name: 'CEDRIC Product' + i,
	// // 			createdByUserId: userId,
	// // 			lastUpdatedByUserId: userId
	// // 		});
	// // 		apiSrv.create('product', product).toPromise();
	// // 	}
	// // });

	// // /** =============== */
	// // /** DELETE ENTITIES */
	// // /** =============== */

	// // const deleteCompany = (companyId, version = 1) => {
	// // 	const company = { ...models.Company, _deleted: true, _version: version };
	// // 	// return apiSrv.delete('company', company)
	// // };
	// // const deleteTeam = (teamId, version = 1) => {
	// // 	const team = { ...models.Team, _deleted: true, _version: version };
	// // 	// return apiSrv.delete('company', company)
	// // };
	// // const deleteProduct = (teamId, version = 1) => {
	// // 	const product = { ...models.Product, _deleted: true, _version: version };
	// // 	// return apiSrv.delete('company', company)
	// // };

	// // const deleteCategory = (teamId, version = 1) => {
	// // 	const product = { ...models.Product, _deleted: true, _version: version };
	// // 	// return apiSrv.delete('company', company)
	// // };

	// // /** ============= */
	// // /** queryOne ENTITY */
	// // /** ============= */

	// // it('should query one company', async done => {
	// // 	const company = await createCompany();
	// // 	apiSrv.queryOne<any>('company', company.id).data$.subscribe(d => {
	// // 		expect(company.name).toBe(d.name);
	// // 		done();
	// // 	});
	// // });

	// // it('should query one user', done => {
	// // 	apiSrv.queryOne<any>('user', userId).data$.subscribe(d => {
	// // 		expect(userId).toBe(d.id);
	// // 		done();
	// // 	});
	// // });

	// // // it('should query one category', async done => {
	// // // 	const category = await createCategory();
	// // // 	apiSrv.queryOne<any>('category', category.id).data$.subscribe(d => {
	// // // 		expect(category.name).toBe(d.name);
	// // // 		done();
	// // // 	});
	// // // });
});
