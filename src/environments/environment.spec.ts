import { environment } from './environment';

describe('test dev environment variables, in case someone change those', () => {
		it('it should have the correct values', () => {
			expect(environment.production).toBe(false);
			expect(environment.graphqlUrl).toBe('wss://showsourcingdev.us1.cloud.realm.io/graphql');
			expect(environment.graphqlAuthUrl).toBe('https://showsourcingdev.us1.cloud.realm.io/auth');
			expect(environment.apiUrl).toBe('https://services-dev.showsourcing.com');
			expect(environment.mixPanelKey).toBe('9143fc0c3d674a93d201e8d9e12fb4f9');
			expect(environment.hubspotKey).toBe('5511311');
			expect(environment.getStreamKey).toBe('aner534ygtg9');
			expect(environment.getStreamAppID).toBe('39385');
			expect(environment.version).toContain('-DEV');
		});
});

