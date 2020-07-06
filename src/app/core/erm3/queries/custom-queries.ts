import gql from 'graphql-tag';
import { ProductQueries } from './custom/product.queries';

export const customQueries = {
	getTeam: gql(`query GetTeam($id: ID!) {
		getTeam(id: $id){
			id name ownerUserId createdBy { id firstName lastName } createdAt
		}
	}`),
	comments: gql(`query listComments($nodeId: String) {
		listCommentByNode(nodeId: $nodeId){
			items { id message nodeId createdBy { id firstName lastName } createdAt }
		}
	}`),
	votes: gql(`query listVotes($nodeId: String, $filter: ModelVoteFilterInput) {
		listVoteByNode(nodeId: $nodeId, filter: $filter){
			items { id rating createdBy { id firstName lastName } createdAt }
		}
	}`),
	getProjectProducts: gql(`query GetProject($id: ID!) {
		getProject(ixd: $id){
			id
			products {
				items {
					product {
						${ProductQueries.defaultFields}
					}
				}
			}
		}
	}`),
	images: gql(`query listImages($filters: ModelImageFilterInput) {
		listImages(filter: $filters) {
			items {
				size
				fileName
				url
			}
		}
	}


	`)
};
