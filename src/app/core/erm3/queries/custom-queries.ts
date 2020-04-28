import gql from 'graphql-tag';


export const customQueries = {
	comments: gql(`query listComments($nodeId: String) {
		listCommentByNode(nodeId: $nodeId){
			items { id message nodeId createdBy { id firstName lastName } createdAt _version }
		}
	}`)
};
