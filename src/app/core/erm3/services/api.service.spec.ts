import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ImageType } from 'app/API.service';
import Amplify from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { first } from 'rxjs/operators';
import { AuthenticationService, TeamService } from '~core/auth';
import awsconfig from '~core/aws-exports';
import * as models from '~core/erm3/models';
import { EntityName } from '../entity-name.type';
import { Entity } from '../models/_entity.model';
import { ApiService } from './api.service';

Amplify.configure(awsconfig);

const mocks = {
	category:  () => new models.Category({ name: 'test apiService Category' }),
	contact: () => new models.Contact({ name: 'test apiService Contact' }),
	// descriptor: () => new models.Descriptor({ target: 'test apiService Descriptor' }),
	image: () => new models.Image({ fileName: 'File Name', orientation: 0, imageType: ImageType }),
	product: () => new models.Product({ name: 'test apiService Product' }),
	supplier: () => new models.Supplier({ name: 'test apiService Supplier' }),
	task: () => new models.Task({ name: 'test apiService Task' })
};

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;

	let userId: any;

	// /** ======================= */
	// /** Create Team and company */
	// /** ======================= */

	const createCompany = () => {
		const company = new models.Company({ name: 'test apiService Company' });
		return apiSrv.create('Company', company, { fetchPolicy: 'no-cache' }).toPromise();
	};
	const createTeam = async (companyId?: string) => {
		if (!companyId) {
			companyId = (await createCompany()).id;
		}
		const team = new models.Team({ name: 'test apiService Team' });
		return apiSrv.create('Team', { ...team, companyId }).toPromise();
	};

	const signIn = () =>
		new Promise((res, rej) => {
			authSrv.signIn({
				username: 'cedric@showsourcing.com',
				password: 'Test1234'
			});
			authSrv.signIn$.subscribe(async username => {
				res(username);
			});
		});

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

		userId = await signIn();
		TeamService.teamId = (await createTeam()).id;
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
	const notCustomQueryAll = [
		'Category',
		'Company',
		'Contact',
		'Descriptor',
		'Image',
		'Product',
		'Supplier',
		'Task',
		'User'
		// 'teamByUser'
	];
	// test queryAll (not custom) for all entities in the QueryPool.map
	notCustomQueryAll.forEach(entity => {
		it(`should query something with queryAll for "${entity}"`, done => {
			apiSrv
				.queryAll(entity as EntityName)
				.data$.pipe(first())
				.subscribe(expectQuerySomething(done));
	it('should create the rest of entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv.create(name as EntityName, getMock()).toPromise();
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	/** ================= */
	/** create functions  */
	/** ================= */

	const createCategory = () => {
		const category = new models.Category({
			name: 'test apiService Category',
			createdByUserId: userId,
			lastUpdatedByUserId: userId
		});
		return apiSrv.create('Category', category).toPromise();
	};

	const createContact = () => {
		const contact = new models.Contact({
			name: 'test apiService Contact',
			createdByUserId: userId,
			lastUpdatedByUserId: userId
		});
		return apiSrv.create('Contact', contact).toPromise();
	};

	const createDescriptor = () => {
		const descriptor = new models.Descriptor({ target: 'test apiService Descriptor' }); // ? The audits are missing for createDescriptor.
		return apiSrv.create('Descriptor', descriptor).toPromise();
	};

	const createImage = () => {
		const image = new models.Image({
			createdByUserId: userId,
			lastUpdatedByUserId: userId,
			fileName: 'File Name',
			orientation: 0,
			imageType: ImageType.JPG
		});
		return apiSrv.create('Image', image).toPromise();
	};

	const createProduct = () => {
		const product = new models.Product({
			name: 'test apiService Product',
			createdByUserId: userId,
			lastUpdatedByUserId: userId
		});
		return apiSrv.create('Product', product).toPromise();
	};

	const createSupplier = () => {
		const supplier = new models.Supplier({
			name: 'test apiService Supplier',
			createdByUserId: userId,
			lastUpdatedByUserId: userId
		});
		return apiSrv.create('Supplier', supplier).toPromise();
	};

	const createTask = () => {
		const task = new models.Task({
			createdByUserId: userId,
			lastUpdatedByUserId: userId,
			name: 'test apiService Task'
		});
		return apiSrv.create('Task', task).toPromise();
	};

	/** ================ */
	/** delete functions */
	/** ================ */

	const deleteCategory = (entity: Entity, entityName: EntityName) => {
		return apiSrv.delete(entityName, entity);
	};

	const notCustomCreate = new Map<EntityName, any>([
		['Category', [createCategory, undefined, deleteCategory]],
		['Company', [createCompany]],
		['Contact', [createContact]],
		['Descriptor', [createDescriptor]],
		['Image', [createImage]],
		['Product', [createProduct]],
		['Supplier', [createSupplier]],
		['Task', [createTask]],
		['Team', [createTeam]]
	]);

	notCustomCreate.forEach(([create, update, del], entityName) => {
		let createdEntity;
		it(`should create a ${entityName}`, async () => {
			createdEntity = await create();
			expect(createdEntity.id).toBeTruthy();
		});
		// fit(`should delete the ${entityName}`, async () => {
		// 	const response = await del(createdEntity, entityName);
		// 	expect(response._deleted).toBe(true);
		// 	debugger;
		// });
	});

	// it('should generate 100 products', () => {
	// 	for (let i = 0; i < 100; i++) {
	// 		const product = new models.Product({
	// 			name: 'CEDRIC Product' + i,
	// 			createdByUserId: userId,
	// 			lastUpdatedByUserId: userId
	// 		});
	// 		apiSrv.create('product', product).toPromise();
	// 	}
	// });

	// /** =============== */
	// /** DELETE ENTITIES */
	// /** =============== */

	// const deleteCompany = (companyId, version = 1) => {
	// 	const company = { ...models.Company, _deleted: true, _version: version };
	// 	// return apiSrv.delete('Company', company)
	// };
	// const deleteTeam = (teamId, version = 1) => {
	// 	const team = { ...models.Team, _deleted: true, _version: version };
	// 	// return apiSrv.delete('Company', company)
	// };
	// const deleteProduct = (teamId, version = 1) => {
	// 	const product = { ...models.Product, _deleted: true, _version: version };
	// 	// return apiSrv.delete('Company', company)
	// };

	// const deleteCategory = (teamId, version = 1) => {
	// 	const product = { ...models.Product, _deleted: true, _version: version };
	// 	// return apiSrv.delete('Company', company)
	// };

	// /** ============= */
	// /** queryOne ENTITY */
	// /** ============= */

	it('should query one company', async done => {
		const company = await createCompany();
		apiSrv.queryOne<any>('Company', company.id).data$.subscribe(d => {
			expect(company.name).toBe(d.name);
			done();
		});
	});

	it('should query one user', done => {
		apiSrv.queryOne<any>('User', userId).data$.subscribe(d => {
			expect(userId).toBe(d.id);
			done();
		});
	});

	// // it('should query one category', async done => {
	// // 	const category = await createCategory();
	// // 	apiSrv.queryOne<any>('category', category.id).data$.subscribe(d => {
	// // 		expect(category.name).toBe(d.name);
	// // 		done();
	// // 	});
	// // });
});
