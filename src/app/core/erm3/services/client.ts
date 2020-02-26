import { Auth } from 'aws-amplify';
import { AUTH_TYPE, AWSAppSyncClient } from 'aws-appsync';
import awsconfig from '~core/aws-exports';

export const client = new AWSAppSyncClient({
	url: awsconfig.aws_appsync_graphqlEndpoint,
	region: awsconfig.aws_appsync_region,
	auth: {
		type: AUTH_TYPE[awsconfig.aws_appsync_authenticationType] as any,
		jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
	}
});
