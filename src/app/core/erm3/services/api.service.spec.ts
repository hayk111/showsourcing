import { ApiService } from './api.service';
import { ApolloTestingController } from 'apollo-angular/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { EntityName, EntityNameType } from '~core/erm/entity-name.enum';
import { RouterModule } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService } from '~core/auth';

/** AWS CONFIGURATION START */
import Amplify from 'aws-amplify';
import awsconfig from '~core/aws-exports';
import { QueryPool } from '../queries/query-pool.class';
import { APP_BASE_HREF } from '@angular/common';
import { Category } from '~core/erm/models';
import { take } from 'rxjs/operators';
Amplify.configure(awsconfig);
/** END */

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
		fit(`should query something with queryAll for "${entity}"`, done => {
			apiSrv
				.queryAll(entity as EntityNameType)
				.data$.pipe(take(1))
				.subscribe(expectQuerySomething(done));
		});
	});

	// test custom queryAll for ListTeamByUser()
	xit('should query something with ListTeamByUser', done => {
		apiSrv
			.queryAll('team', { query: QueryPool.map.team.queryAllByUser })
			.data$.pipe(take(1))
			.subscribe(expectQuerySomething(done));
	});

	/** =============== */
	/** CREATE ENTITIES */
	/** =============== */

	// test create company
	// it('should be able to create a company', done => {
			
	// });

	// test create team

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
