import gql from 'graphql-tag';


export const customQueries = {
	comments: gql(`query listComments($nodeId: String) {
		listCommentByNode(nodeId: $nodeId){
			items { id message nodeId createdBy { id firstName lastName } createdAt _version }
		}
	}`),
	votes: gql(`query listVotes($nodeId: String, $filter: ModelVoteFilterInput) {
		listVoteByNode(nodeId: $nodeId, filter: $filter){
			items { id rating createdBy { id firstName lastName } createdAt _version }
		}
	}`)
};
