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
import { AuthenticationService } from '~core/auth';
import { QueryPool } from '../queries/query-pool.class';
import { APP_BASE_HREF } from '@angular/common';
import { Category } from '~core/erm/models';
import { take, first } from 'rxjs/operators';
import * as mocks from '~core/erm3/queries/mocks';
import { MajorTickOptions } from 'chart.js';

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;

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
		await authSrv.signIn({
			username: 'cedric@showsourcing.com',
			password: 'Test1234'
		});
	});

	/** ======== */
	/** QueryAll */
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
		xit(`should query something with queryAll for "${entity}"`, done => {
			apiSrv
				.queryAll(entity as EntityNameType)
				.data$.pipe(first())
				.subscribe(expectQuerySomething(done));
		});
	});

	// test custom queryAll for ListTeamByUser() // TODO change the title in the queryBuilder by queryName
	xit('should query something with ListTeamByUser', done => {
		apiSrv
			.queryAll('team', { query: QueryPool.map.team.queryAllByUser })
			.data$.pipe(first())
			.subscribe(expectQuerySomething(done));
	});

	/** =============== */
	/** CREATE ENTITIES */
	/** =============== */

	// run dependant tests

	// create company
	const createCompany = () => {
		return apiSrv.create('company', mocks.companyMock).toPromise();
	};
	const deleteCompany = (companyId, version = 1) => {
		const company = { ...mocks.companyMock, _deleted: true, _version: version };
		// return apiSrv.delete('company', company)
	};

	// create team
	const createTeam = companyId => {
		return apiSrv.create('team', mocks.teamMock).toPromise();
	};

	it('should create a company', done => {
		createCompany()
			.then(d => {
				expect(d.id).toBeTruthy();
				done();
				deleteCompany(d.id);
			})
			.catch(err => {
				fail(err);
				done();
			});
	});

	// test Category
	xit('should create a category and get it', done => {
		const category = new Category({ name: 'test category' }); // the model have to change
		apiSrv.create(EntityName.CATEGORY, category).subscribe(
			d => {
				expect(d).toBeTruthy();
				done();
			},
			err => {
				fail(err);
				done();
			}
		);
	});
});
