import { Auth } from 'aws-amplify';
import { AUTH_TYPE, AWSAppSyncClient } from 'aws-appsync';
import { environment } from 'environments/environment';

export const client = new AWSAppSyncClient({
	url: environment.awsConfig.aws_appsync_graphqlEndpoint,
	region: environment.awsConfig.aws_appsync_region,
	auth: {
		type: AUTH_TYPE[environment.awsConfig.aws_appsync_authenticationType] as any,
		jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
	},
});
