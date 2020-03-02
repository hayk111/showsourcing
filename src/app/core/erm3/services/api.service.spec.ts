/** AWS CONFIGURATION START */
import Amplify from 'aws-amplify';
import awsconfig from '~core/aws-exports';
Amplify.configure(awsconfig);
/** END */
import { ApiService } from './api.service';
import { ApolloTestingController } from 'apollo-angular/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { EntityName, EntityNameType } from '~core/erm/entity-name.enum';
import { RouterModule } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService, TeamService } from '~core/auth';
import { QueryPool } from '../queries/query-pool.class';
import { APP_BASE_HREF } from '@angular/common';
import { Category } from '~core/erm/models';
import { take, first, publishReplay } from 'rxjs/operators';
import * as models from '~core/erm3/models';
import { MajorTickOptions } from 'chart.js';

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;

	let userId: any;

	beforeAll(async () => {
		TestBed.configureTestingModule({
			imports: [RouterModule.forRoot([])],
			providers: [
				AmplifyService,
				AuthenticationService,
				ApiService,
				{ provide: APP_BASE_HREF, useValue: '/' }
			]
		});
		apiSrv = TestBed.get(ApiService);
		authSrv = TestBed.get(AuthenticationService);
		authSrv.signIn$.subscribe(username => {
			userId = username;
		});
		await authSrv.signIn({
			username: 'cedric@showsourcing.com',
			password: 'Test1234'
		});
	});

	/** ======== */
	/** queryAll */
	/** ======== */

	const expectQuerySomething = done => ({
		next: d => {
			expect(d).toBeTruthy();
			done();
		},
		error: err => {
			fail(err);
			done();
		}
	});

	// entities not custom implemented :
	const notCustomEntities = [
		'category',
		'company',
		'contact',
		'descriptor',
		'image',
		'product',
		'supplier',
		'task',
		'user'
	];
	// test queryAll (not custom) for all entities in the QueryPool.map
	notCustomEntities.forEach(entity => {
		it(`should query something with queryAll for "${entity}"`, done => {
			apiSrv
				.queryAll(entity as EntityNameType)
				.data$.pipe(first())
				.subscribe(expectQuerySomething(done));
		});
	});

	// // test custom queryAll for ListTeamByUser() // TODO change the title in the queryBuilder by queryName
	// it('should query something with ListTeamByUser', done => {
	// 	apiSrv
	// 		.queryAll('team', undefined, 'queryAllByUser' as any)
	// 		.data$.pipe(first())
	// 		.subscribe(expectQuerySomething(done));
	// });

	// /** =============== */
	// /** CREATE ENTITIES */
	// /** =============== */

	const createCompany = () => {
		const company = new models.Company({ name: 'test apiService Company' });
		return apiSrv.create('company', company).toPromise();
	};

	const createTeam = async (companyId?: string) => {
		if (!companyId) {
			companyId = (await createCompany()).id;
		}
		const team = new models.Team({ name: 'test apiService team' });
		return apiSrv.create('team', {...team, companyId}).toPromise();
	};

	// const createCategory = async (teamId?: string) => {
	// 	if (!teamId) {
	// 		teamId = (await createTeam()).id;
	// 	}
	// 	const category = {
	// 		...models.Category,
	// 		teamId,
	// 		createdByUserId: userId,
	// 		lastUpdatedByUserId: userId,
	// 	};
	// 	return apiSrv.create('category', category).toPromise();
	// };

	// const createContact = teamId => {
	// 	const contact = { ...models.Contact, teamId };
	// 	return apiSrv.create('contact', contact).toPromise();
	// };

	// const createDescriptor = async (teamId?: string) => {
	// 	if (!teamId) {
	// 		teamId = (await createTeam()).id;
	// 	}
	// 	const descriptor = { ...models.Descriptor, teamId };
	// 	return apiSrv.create('descriptor', descriptor).toPromise();
	// };

	// const createImage = teamId => {
	// 	const image = { ...models.Image, teamId };
	// 	return apiSrv.create('image', image).toPromise();
	// };

	// const createProduct = teamId => {
	// 	const product = { ...models.Product, teamId };
	// 	return apiSrv.create('product', product).toPromise();
	// };

	// const createSupplier = teamId => {
	// 	const supplier = { ...models.Supplier, teamId };
	// 	return apiSrv.create('supplier', supplier).toPromise();
	// };

	// const createTask = teamId => {
	// 	const task = { ...models.Task, teamId };
	// 	return apiSrv.create('task', task).toPromise();
	// };

	it('should create a company', async () => {
		const company = await createCompany();
		expect(company.id).toBeTruthy();
	});

	// it('should create a category', async done => {
	// 	const category = await createCategory();
	// 	expect(category.id).toBeTruthy();
	// 	done();
	// });
	// it('should create a contact');
	// it('should create a descriptor', async done => {
	// 	const descriptor = await createDescriptor();
	// 	expect(descriptor.id).toBeTruthy();
	// 	done();
	// });
	// it('should create an image');
	// it('should create a product');
	// it('should create a supplier');
	// it('should create a task');
	fit('should create a team', async done => {
		const team: any = await createTeam();
		expect(team.id).toBeTruthy();
		done();
	});
	// it('should create a user');

	// /** =============== */
	// /** DELETE ENTITIES */
	// /** =============== */

	// const deleteCompany = (companyId, version = 1) => {
	// 	const company = { ...models.Company, _deleted: true, _version: version };
	// 	// return apiSrv.delete('company', company)
	// };
	// const deleteTeam = (teamId, version = 1) => {
	// 	const team = { ...models.Team, _deleted: true, _version: version };
	// 	// return apiSrv.delete('company', company)
	// };
	// const deleteProduct = (teamId, version = 1) => {
	// 	const product = { ...models.Product, _deleted: true, _version: version };
	// 	// return apiSrv.delete('company', company)
	// };

	// const deleteCategory = (teamId, version = 1) => {
	// 	const product = { ...models.Product, _deleted: true, _version: version };
	// 	// return apiSrv.delete('company', company)
	// };

	// /** ============= */
	// /** queryOne ENTITY */
	// /** ============= */

	// it('should query one company', async done => {
	// 	const company = await createCompany();
	// 	apiSrv.queryOne<any>('company', company.id).data$.subscribe(d => {
	// 		expect(company.name).toBe(d.name);
	// 		done();
	// 	});
	// });

	// // it('should query one category', async done => {
	// // 	const category = await createCategory();
	// // 	apiSrv.queryOne<any>('category', category.id).data$.subscribe(d => {
	// // 		expect(category.name).toBe(d.name);
	// // 		done();
	// // 	});
	// // });

	// // ? not in API
	// // it('should query one team', async done => {
	// // 	const team = await createTeam();
	// // 	apiSrv.queryOne<any>('team', team.id).data$.subscribe(d => {
	// // 		expect(team.name).toBe(d.name);
	// // 		done();
	// // 	});
	// // });
});
