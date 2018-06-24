import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { forkJoin, Observable } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import { RequestQueries } from '~features/products/services/request.queries';
import { TeamQueries } from '~features/products/services/team.queries';
import { User } from '~models';
import { ApolloClient } from '~shared/apollo';
import { uuid } from '~utils';
import { PER_PAGE } from '~utils/constants';

@Injectable()
export class TeamService {
	private membersQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		team members.
	 */
	private initializeTeamMembersQuery() {
		if (!this.membersQuery$) {
			this.membersQuery$ = this.apollo.query<any>({
				query: TeamQueries.memberList,
				variables: {
					query: '',
					skip: 0,
					take: PER_PAGE,
					sortBy: 'name',
					descending: true
				}
			});
		}
	}

	/*
		Initialize the underlying query ref for the list of
		team members.
	 */
	selectTeamMembers(): Observable<User[]> {
		this.initializeTeamMembersQuery();
		return this.membersQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).teamUsers),
				map(teamUsers => teamUsers.map(teamUser => teamUser.user))
			);
	}

	/*
        Add vote requests for users.
     */
	addProductFeedbacksForTeamUsers(users: User[], productIds: string[]): Observable<any[]> {
		// TODO: batching should be used here to execute mutations
		return forkJoin(users.map(user => this.addProductFeedbacksTeamUser(user, productIds)));
	}

	/*
        Add vote request for user and products.
     */
	addProductFeedbacksTeamUser(user: User, productIds: string[]): Observable<any> {
		const voteRequest = {
			id: uuid(),
			status: 'pending'
		};
		return this.addVoteRequest(voteRequest).pipe(
			switchMap(addedVoteRequest => this.updateVoteRequest({
				...addedVoteRequest,
				user,
				products: productIds.map(productId => ({ id: productId })),
			}))
		);
	}

	/*
        Add vote request.
     */
	addVoteRequest(voteRequest) {
		return this.apollo.update({
			gql: RequestQueries.addVoteRequest,
			input: voteRequest, typename: 'voteRequest'
		})
			.pipe(
				first(),
				map((r: any) => r.data.addvoteRequest)
			);
	}

	/*
        Update vote request.
     */
	updateVoteRequest(voteRequest) {
		return this.apollo.update({ gql: RequestQueries.updateVoteRequest, input: voteRequest, typename: 'voteRequest' })
			.pipe(first());
	}
}
