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
Amplify.configure(awsconfig);
/** END */

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;

	beforeAll(async () => {
		TestBed.configureTestingModule({
			imports: [RouterModule.forRoot([])],
			providers: [AmplifyService, AuthenticationService, ApiService, {provide: APP_BASE_HREF, useValue : '/' }]
		});
		apiSrv = TestBed.get(ApiService);
		authSrv = TestBed.get(AuthenticationService);
		await authSrv.signIn({
			username: 'cedric@showsourcing.com',
			password: 'Test1234'
		});
	});

	// test queryAll for all entities in the QueryPool.map
	Object.entries(QueryPool.map).forEach(([entity, queries]) => {
	it(`should query something with queryAll for "${entity}"`, done => {
		const obs$ = apiSrv.queryAll(entity as EntityNameType);
		obs$.data$.subscribe(
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

	/** CREATE ENTITIES */
	// test Category
	xit('should create a category and get it', (done) => {
		const category = new Category({name: 'test category'}); // the model have to change
		apiSrv.create(EntityName.CATEGORY, category).subscribe(d => {
			expect(d).toBeTruthy();
			done();
		}, err => {
			fail(err);
			done();
		});
	});

	it('should query something with create for any entity');
	it('should query something with update for any entity');
});
