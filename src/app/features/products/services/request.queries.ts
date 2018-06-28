import gql from 'graphql-tag';

// TODO: thiery , this should go away, and we should have a global service
// VoteRequestService and VoteRequestQueries. Please check other global services.
export class RequestQueries {
	static addVoteRequest = gql`
		mutation addvoteRequest($input: voteRequestInput!) {
			addvoteRequest(input: $input) {
				id
			}
		}`;

	static updateVoteRequest = gql`
		mutation updatevoteRequest($input: voteRequestInput!) {
			updatevoteRequest(input: $input) {
				id
			}
		}`;

	static addExportRequest = gql`
		mutation addexportRequest($input: exportRequestInput!) {
			addexportRequest(input: $input) {
				id
			}
		}`;

	static updateExportRequest = gql`
		mutation updateexportRequest($input: exportRequestInput!) {
			updateexportRequest(input: $input) {
				id
			}
		}`;
}
