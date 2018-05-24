import gql from 'graphql-tag';



export class ProductQueries {
    static list = gql`
		query products {
			products(take: 30) {
				id,
				name,
                description,
				creationDate,
				createdBy {
					lastName,
					firstName
				}
			}
        }`;

}
