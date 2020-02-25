import { ApiService } from './api.service';
import { ApolloTestingController } from 'apollo-angular/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { EntityName } from '~core/erm/entity-name.enum';

describe('ApiService',() => {
	let apiSrv: ApiService;
	beforeEach(() => {
		apiSrv = TestBed.get(ApiService);
	})

	it('should query something with queryAll for any entity', (done) => {
		let obs$ = apiSrv.queryAll(EntityName.PRODUCT);
		obs$.data$.subscribe(d => {
			expect(d).toBeTruthy();
			done();
		}, (err) => {
			console.log(err)
			expect(err).toBeFalsy();
			done();
		})
	})

	it('should query something with queryOne for any entity')
	it('should query something with create for any entity')
	it('should query something with update for any entity')

})
