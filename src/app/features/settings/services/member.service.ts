import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { ApolloClient } from '~shared/apollo';
import gql from 'graphql-tag';
import { map, tap, publish, take, refCount, filter, first, switchMap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { MemberQueries } from '~features/settings/services/member.queries';
import { TeamUser } from '~models';
import { Contact, Task } from '~models';
import { Product } from '~models';
import { uuid } from '~utils/uuid.utils';
import { PER_PAGE } from '~utils/constants';
import { UserService } from '~features/user';


@Injectable()
export class MemberService {
	private membersQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient, private userSrv: UserService) { }

	/*
		Initialize the underlying query ref for the list of
		members.
	 */
	private initializeMemberQuery(): void {
		if (!this.membersQuery$) {
			this.membersQuery$ = this.apollo.query<any>({
				query: MemberQueries.list,
				variables: {
					skip: 0,
					take: PER_PAGE
				}
			});
		}
	}

	/*
		Method used to get an observable to link on to
		get the list of members.

		Returns an hot observable to be notified each time
		the members data associated with the query changes.
	 */
	selectMembers(): Observable<TeamUser[]> {
		this.initializeMemberQuery();
		return this.membersQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).teamUsers),
		);
	}

	/*
		Triggers the load of a page of members based on
		a page number.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	loadMembersNextPage({ page, sort }): Promise<any> {
		this.initializeMemberQuery();
		return this.membersQuery$.fetchMore({
			variables: sort ? {
				skip: page * PER_PAGE,
				take: PER_PAGE,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'ASC'
			} : {
				skip: page * PER_PAGE,
				take: PER_PAGE
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				console.log('>> prev = ', prev);
				console.log('>> fetchMoreResult = ', fetchMoreResult);
				if (!fetchMoreResult) { return prev; }
				return {
					...prev,
					teamUsers: [...prev.teamUsers, ...fetchMoreResult.teamUsers],
				};
			}
		});
	}

	/*
		Sorts the members data for a specified column.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	sortMembers({ sort }): Promise<any> {
		this.initializeMemberQuery();
		return this.membersQuery$.refetch({
			skip: 0,
			take: PER_PAGE,
			sortBy: sort.sortBy,
			descending: sort.sortOrder === 'ASC'
		});
	}

	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<TeamUser> {
		return this.apollo.subscribe({ query: MemberQueries.member, variables: { query: `id == '${id}'` } }).pipe(
			filter((r: any) => r.data.teamUsers),
			map((r: any) => r.data.teamUsers[0])
		);
	}

	updateMember(member: TeamUser) {
		return this.apollo.update({
			mutation: MemberQueries.updateMember,
			input: member,
			typename: 'Member'
		});
	}

	updateMembers({ accessType }: { accessType: string }) {
		return this.selectMembers().pipe(
			first(),
			switchMap(members => {
				return (members && members.length > 0) ?
					forkJoin(members.map(member => this.updateMember({
						...member,
						accessType
					}))) : of(true);
			})
		);
	}

	deleteMember(memberId: string) {
		return this.apollo.update({ mutation: MemberQueries.deleteMember, input: memberId, typename: 'TeamUser' }).pipe(first());
	}

	deleteMembers(members: string[]) {
		return forkJoin(members.map(memberId => this.deleteMember(memberId)));
	}

	inviteMember(email: string) {
		return this.userSrv.selectUser().pipe(
			switchMap(user => {
				const invitation = {
					id: uuid(),
					email,
					inviter: user,
					accessType: 'ReadOnly',
					status: 'pending'
				};
				return this.apollo.update({ mutation: MemberQueries.inviteMember, input: invitation, typename: 'TeamUser' }).pipe(first());
			})
		);
	}
}

