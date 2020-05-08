import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';


// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// TODO: we should add a log config like:
// config = {
//   guards: true,
//   components: false,
//   entitySrv: true,
//   showSubscriptions: false,
//   routing: false
// }
// so we can have more fine grained logs

export const environment = {
	version: WEB_VERSION + '-DEV',
	production: false,
	hmr: false,
	graphqlUrl: 'wss://showsourcingdev.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingdev.us1.cloud.realm.io/auth',
	apiUrl: 'https://services-dev.showsourcing.com',
	getStreamKey: 'aner534ygtg9',
	getStreamAppID: '46893',
	mixPanelKey: '9143fc0c3d674a93d201e8d9e12fb4f9',
	hubspotKey: '5511311',
	LOG_LEVEL: LogLevel.DEBUG,
	awsConfig: {
		aws_project_region: 'us-east-1',
		aws_cognito_identity_pool_id: 'us-east-1:70a97638-a7bd-4e7c-8955-f4f1beaff13d',
		aws_cognito_region: 'us-east-1',
		aws_user_pools_id: 'us-east-1_IWXYj57D8',
		aws_user_pools_web_client_id: '4ve4rgksboe0cs5er1li6159nb',
		oauth: {},
		aws_cloud_logic_custom: [
				{
						name: 'AdminQueries',
						endpoint: 'https://9l6k2n1we2.execute-api.us-east-1.amazonaws.com/antoine',
						region: 'us-east-1'
				}
		],
		aws_appsync_graphqlEndpoint: 'https://uzy642hkkzarrpqtfbn6plvm5e.appsync-api.us-east-1.amazonaws.com/graphql',
		aws_appsync_region: 'us-east-1',
		aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
		aws_dynamodb_all_tables_region: 'us-east-1',
		aws_dynamodb_table_schemas: [
				{
						tableName: 'legacyUserDB-antoine',
						region: 'us-east-1'
				}
		],
		aws_user_files_s3_bucket: 'showsourcing-files152822-antoine',
		aws_user_files_s3_bucket_region: 'us-east-1'
	}
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
