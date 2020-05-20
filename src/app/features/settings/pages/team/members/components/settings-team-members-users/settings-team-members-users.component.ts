import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, combineLatest, timer } from 'rxjs';
import { switchMap, map, debounce, tap, first } from 'rxjs/operators';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { FilterService, FilterType } from '~core/filters';
import { MembersInvitationService } from '../../services/members-invitation.service';
import { Invitation, TeamUser, User, ApiService } from '~core/erm3';
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';
import { TeamService } from '~core/auth';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [
		ListPageViewService,
		ListFuseHelperService,
		SelectionService,
	],
	host: { class: 'table-page' }
})
export class SettingsTeamMembersUsersComponent extends AutoUnsub
	implements OnInit {
	teamOwner: boolean;
	teamMembers: TeamUser[] = [];
	rows$: Observable<any[]>;
	user: User;
	hasSelected = false;

	fuseOptions = {
		shouldSort: true,
		includeScore: true,
		threshold: 0, // for full match
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
	};

	constructor(
		private dlgCommonSrv: DialogCommonService,
		private featureSrv: SettingsMembersService,
		public listHelper: ListFuseHelperService,
		public filterSrv: FilterService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<TeamUser>,
		private translate: TranslateService,
		public selectionSrv: SelectionService,
		public membersInvitationSrv: MembersInvitationService,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['user.firstName', 'user.lastName']);
		this.listHelper.setup('TeamUser', 'Team', TeamService.teamSelected.teamId, {}, this.fuseOptions);

		this.rows$ = this.listHelper.searchedItems$
			.pipe(
				switchMap((members: any[]) => {
					const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
					this.teamMembers = members;

					const options: any = {};
					const invitationFilters: any = {
						deleted: { eq: false },
						// teamId: { eq: TeamService.teamSelected.id } // teamId is being set in filters because the default query by id doesn't work
					};

					if (searchValue && searchValue.value !== '') {
						invitationFilters.email = {
							contains: searchValue.value
						};
					}

					options.variables = {
						byId: TeamService.teamSelected.id,
						limit: 10000,
						filter: invitationFilters
					};
					options.fetchPolicy = 'network-only';
					options.query = QueryPool.getQuery('Invitation', QueryType.LIST_BY)('Team');
					return this.apiSrv.query<Invitation[]>(options).data$;
				}),
				map((invitations: Invitation[]) => [...this.teamMembers, ...invitations])
			);

		this.viewSrv.setup({
			typename: 'TeamUser',
			destUrl: 'settings/team/members/components/settings-team-members-users',
			view: 'table',
		});

		// this.featureSrv
		// 	.selectTeamOwner()
		// 	.pipe(takeUntil(this._destroy$))
		// 	.subscribe(({ user, teamOwner }) => {
		// 		this.teamOwner = teamOwner;
		// 		this.user = <User>user;
		// 	});
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgCommonSrv.openInvitationDialog().data$
			.pipe(
				switchMap((entity) => {
					return this.apiSrv.create('Invitation', {
						...entity,
						teamRole: 'TEAMMEMBER'
					});
				}),
				tap(_ => this.listHelper.refetch())
		)
		.subscribe();
	}

	updateAccessType({
		accessType,
		userId
	}: {
		accessType: string;
		userId: string;
	}) {
		this.featureSrv
			.updateAccessType(accessType, userId)
			.pipe(switchMap(_ => this.listHelper.refetch()))
			.subscribe(_ => this.selectionSrv.unselectAll());
	}

	updateAccessTypeSelected(accessType) {
		const ids = this.selectionSrv.getSelectedIds();
		const calls = ids.map(id =>
			this.featureSrv.updateAccessType(accessType, id)
		);
		forkJoin(calls).subscribe(_ => this.selectionSrv.unselectAll());
	}

	getTooltipMsg() {
		return !this.teamOwner
			? this.translate.instant('message.only-team-owners-can-invite')
			: null;
	}

	deleteItem(item: TeamUser | Invitation) {
		this.apiSrv.delete(item.__typename, item).pipe(first()).subscribe();
	}
}
