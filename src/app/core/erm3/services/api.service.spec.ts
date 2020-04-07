/** AWS CONFIGURATION START */
import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import Amplify from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { first, switchMap, tap, take } from 'rxjs/operators';
import { AuthenticationService, TeamService } from '~core/auth';
import awsconfig from '../../../../../generated/aws-exports.js';
import { Typename } from '../typename.type';

import * as models from '~core/erm3/models';
import { ApiService } from './api.service';
import { QueryPool } from '../queries/query-pool.class';
import { QueryType } from '../queries/query-type.enum';
import { Entity } from '../models/_entity.model';

Amplify.configure(awsconfig);

const mocks = {
	// Attachment: () => new models.Attachment({fileName: 'test apiService Attachment'})
	// // Company: () => new models.Company({ name: 'test apiService Company' }),
	// // Team: () =>
	// // 	new models.Team({
	// // 		companyId: '81a13441-6193-45a0-b9b8-8f7135f82609',
	// // 		name: 'test apiService Team'
	// // 	}),

	// Category: () => new models.Category({ name: 'test apiService Category' }),
	// Contact: () => new models.Contact({ name: 'test apiService Contact' }),
	// Descriptor: () => new models.Descriptor({ target: 'test apiService Descriptor' }), // ! lastupdatedByUserId should be lastUpdatedByUserId
	// Image: () =>
	// 	new models.Image({ fileName: 'File Name', orientation: 0, imageType: ImageType.PNG }),
	Product: () => new models.Product({ name: 'test apiService Product' })
	// Supplier: () => new models.Supplier({ name: 'test apiService Supplier' }),
	// Task: () => new models.Task({ name: 'test apiService Task' }),
	// Comment: () => new models.Comment({ nodeId: 'fakeId' }),
	// Constant: () =>
	// 	new models.Constant({ helperType: HelperType.COUNTRY, code: 'ISO2 (BE)', label: 'Belgium' }), // Country | Harbour | Currency
	// Event: () => new models.Event({ name: 'test apiService Event' }),
	// EventDescription: () => new models.EventDescription({ name: 'test apiService EventDescription' }),
	// Venue: () => new models.Venue({ name: 'test apiService Venue' }),
	// Industry: () => new models.Industry({ name: 'test apiService Industry' }),
	// Export: () => new models.Export({ format: ExportFormat.IMAGE }),
	// Invitation: () => new models.Invitation({ email: 'test apiService Invitation' }),
	// Project: () => new models.Project({ name: 'test apiService Project' }),
	// // Sample: () =>
	// // 	new models.Sample({
	// // 		name: 'test apiService Sample',
	// // 		description: 'desc',
	// // 		linkedProductId,
	// // 		linkedSupplierId,
	// // 		price,
	// // 		paid
	// // 	}),
	// Tag: () => new models.Tag({ name: 'test apiService Tag' })
};

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;
	let userId: any;
	let originalTimeout: number;

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
		const user = await authSrv.signIn({
			username: 'augustin@showsourcing.com',
			password: 'Test1234'
		});
		userId = user.username;
		apiSrv.setTeamId('542a2b98-a315-45be-a56f-e8d372fa2b4b');
		apiSrv.setUserId(userId);
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
	});

	afterAll(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it('should add to cached list', async() => {
		const filter = { teamId: TeamService.teamSelected.id };
		const productsRef = apiSrv.search('Product', { filter });
		const products = await productsRef.data$
			.pipe(take(1)).toPromise();
		const lengthBefore = products.length;
		apiSrv.addToList(productsRef, mocks.Product());
		const productsAfter =	await productsRef.data$
		.pipe(take(1)).toPromise();
		const lengthAfter = productsAfter.length;
		expect(lengthAfter).toEqual(lengthBefore + 1);
	});

	fit('should create entities', async () => {
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

	fit('should update entities', async () => {
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

	fit('should delete entities', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.pipe(
					switchMap(createdEntity =>
						apiSrv.delete(name as Typename, { id: createdEntity.id, _version: 1 } as Entity)
					)
				)
				.toPromise()
				.catch(e => fail(`entity ${name} failed delete: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	fit('should get each entity', async () => {
		const promises = Object.entries(mocks).map(([name, getMock]) => {
			return apiSrv
				.create(name as Typename, getMock())
				.pipe(
					switchMap(createdEntity => apiSrv.get(name as Typename, createdEntity.id).data$),
					first()
				)
				.toPromise()
				.catch(e => fail(`entity ${name} failed queryOne: ${e}`));
		});
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});

	it('should query all by entity', async () => {
		// get all queries by from query-pool => [ [typename1, byTypename1], ...]
		const queryByToTest = {
			// Category: ['Team'],
			// Company: ['Owner'],
			// TeamUser: ['User'],
			// Attachment: ['Product'],
			Comment: ['Node'],
			// Contact: ['Supplier'],
			//// Constant,
			// WorkflowStatus: ['Team'],
			// Sample: ['Product', 'Supplier'],
			// Tag: ['Team'],
			// Task: ['Product'],
			Vote: ['Node']
		};

		// run queries into promises
		const promises = [];
		Object.entries(queryByToTest).forEach(([typename, byProperties]) => {
			byProperties.forEach(byProperty => {
				promises.push(
					apiSrv
						.listBy(typename as Typename, byProperty, 'PRODUCT:34c50a55-ef0e-4cca-932a-ca79adac9a99')
						.data$.pipe(first())
						.toPromise()
						.catch(e => fail(`entity ${typename} failed query by ${byProperty}: ${e}`))
				);
			});
		});

		// test results
		if (!promises.length) fail('there is no call "listBy"');
		const results = await Promise.all(promises);
		results.forEach(response => {
			expect(response).toBeTruthy();
		});
	});
});
