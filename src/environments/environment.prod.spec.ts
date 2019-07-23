import { environment } from './environment.prod';

describe('test prod environment variables, in case someone change those', () => {
		it('it should have the correct values', () => {
			expect(environment.production).toBe(true);
			expect(environment.graphqlUrl).toBe('wss://showsourcingprod.us1.cloud.realm.io/graphql');
			expect(environment.graphqlAuthUrl).toBe('https://showsourcingprod.us1.cloud.realm.io/auth');
			expect(environment.apiUrl).toBe('https://services.showsourcing.com');
			expect(environment.mixPanelKey).toBe('b59449e8af12d91ac73a9aa92b1a29a7');
			expect(environment.hubspotKey).toBe('2134370');
			expect(environment.getStreamKey).toBe('kn8zj3tgdkf3');
		});
});

