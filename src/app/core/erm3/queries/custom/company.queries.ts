import gql from 'graphql-tag';


export class CompanyQueries {
	create = gql`
		mutation CreateCompany($input: CreateCompanyInput!) {
			createCompany(input: $input) {
				id name
			}
		}
	`;
	queryAll = gql`
		query ListCompanys {
			listCompanys {
				items {
					id
					name
				}
			}
		}
	`;
}
