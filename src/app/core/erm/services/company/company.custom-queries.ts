import { CustomQueries } from '../_global/query-builder-2.class';


export const customQueries: CustomQueries = {
	create: `
		mutation CreateCompany($input: CreateCompanyInput!) {
			createCompany(input: $input) {
				id name
			}
		}
	`,
	queryAll: `
		query ListCompanys {
			listCompanys {
				items {
					id
					name
				}
			}
		}
	`
};
