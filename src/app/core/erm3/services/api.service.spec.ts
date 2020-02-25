import { ApiService } from './api.service';
import { ApolloTestingController } from 'apollo-angular/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { EntityName } from '~core/erm/entity-name.enum';
import { RouterModule } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService } from '~core/auth';

/** AWS CONFIGURATION START */
import Amplify from 'aws-amplify';
import awsconfig from '~core/aws-exports';
Amplify.configure(awsconfig);
/** END */

fdescribe('ApiService', () => {
	let apiSrv: ApiService;
	let authSrv: AuthenticationService;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [RouterModule.forRoot([])],
			providers: [AmplifyService, AuthenticationService, ApiService]
		});
		apiSrv = TestBed.get(ApiService);
		authSrv = TestBed.get(AuthenticationService);
		await authSrv.signIn({
			username: 'cedric+5@showsourcing.com',
			password: 'test1234'
		});
	});

	it('should query something with queryAll for any entity', done => {
		const obs$ = apiSrv.queryAll(EntityName.PRODUCT);
		obs$.data$.subscribe(
			d => {
				expect(d).toBeTruthy();
				done();
			},
			err => {
				expect(err).toBeFalsy();
				done();
			}
		);
	});

	it('should query something with queryOne for any entity');
	it('should query something with create for any entity');
	it('should query something with update for any entity');
});
