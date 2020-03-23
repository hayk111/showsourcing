/** AWS CONFIGURATION START */
import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import Amplify from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService, TeamService } from '~core/auth';
import awsconfig from '../../../../../generated/aws-exports.js';
import { Typename } from '../typename.type';

import * as models from '~core/erm3/models';
import { ApiService } from './api.service';
import { ImageType, HelperType, ExportFormat } from '../../../../../generated/API.service';
import { switchMap, first, take } from 'rxjs/operators';
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
	Product: () => new models.Product({ name: 'test apiService Product' }),
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
			username: 'cedric@showsourcing.com',
			password: 'Test1234'
		});
		userId = user.username;
		apiSrv.setTeamId('605d300b-f108-4254-bea2-d30cba188af2');
		apiSrv.setUserId(userId);
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
	});

	afterAll(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	// fit('should add to cached list', async() => {
	// 	const products = await queryAll.data$.pipe(take(1)).toPromise();
	// 	apiSrv.addToList(queryAll, mocks.Product());
	// 	const productsAfter = await queryAll.data$.pipe(take(1)).toPromise();
	// 	expect(products.length).toEqual(productsAfter.length - 1);
	// });

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

	it('should get each entity', async () => {
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
		const collectQueryBy = [];
		Object.entries(QueryPool.map).forEach(([typename, baseQuery]: any) => {
			if (!baseQuery[QueryType.LIST_BY]) return;
			Object.keys(baseQuery[QueryType.LIST_BY]).forEach(byTypename => {
				collectQueryBy.push([typename, byTypename]);
			});
		});

		// run queries into promises
		const promises = collectQueryBy.map(([typename, byTypename]) => {
			return apiSrv
				.listBy(typename, byTypename, 'fakeId')
				.data$.pipe(first())
				.toPromise()
				.catch(e => fail(`entity ${typename} failed query by ${byTypename}: ${e}`));
		});

		// test results
		if (!promises.length) fail('there is no call "listBy"');
		const results = await Promise.all(promises);
		results.forEach(result => {
			expect(result).toBeTruthy();
		});
	});
});
