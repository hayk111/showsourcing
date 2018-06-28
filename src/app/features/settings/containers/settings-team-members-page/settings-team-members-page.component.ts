import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MemberService } from '~features/settings/services/member.service';
import { MenuService } from '~features/settings/services/menu.service';
import { Supplier, TeamUser } from '~models';
import { DialogService } from '~shared/dialog';
import { Filter, FilterService } from '~shared/filters';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';

import { SelectionService } from '~shared/list-page/selection.service';
import { NewTaskDlgComponent } from '~features/tasks';
import { InviteUserDlgComponent } from '~features/settings/components';


// TODO: thierry there is ListPageComponent and ListView component that alleviate
// list pages from A LOT of logic. It's really fast to refactor, check product list
// component or supplier list component.
// also you should provide a key to filter service and inject selection service as well
// next to it
// You also need 1 feature service now that extend the global service of whatever service
// the page is about. Again please check suppliers-page, as it will give you a good
// view of how simple this turns out to be.
@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss'],
	providers: [FilterService]
})
export class SettingsTeamMembersPageComponent extends AutoUnsub implements OnInit {
	members: Array<Supplier> = [];
	members$: Observable<Supplier[]>;
	filters: Array<Filter> = [];
	/** current sort used for sorting members */
	sort$: Subject<Sort> = new Subject();
	/** current filters applied to members */
	filters$: Observable<Filter[]>;
	pagination$: Observable<any>;
	currentSort: Sort = { sortBy: 'name', sortOrder: 'ASC' };
	/** selected members */
	selected$: Observable<Map<string, boolean>>;
	/** menu collapsed */
	menuCollapsed$: Observable<boolean>;
	menuCollapsed = false;
	/** whether some members are currently being loaded */
	pending: boolean;
	/** whether we loaded every members */
	fullyLoaded: boolean;
	/** when the members are loaded for the first time */
	initialLoading = true;
	/** number of members requested by paginated request */
	page = 0;

	constructor(
		private memberSrv: MemberService,
		private selectionSrv: SelectionService,
		private dlgSrv: DialogService,
		private menuSrv: MenuService) {
		super();
	}

	ngOnInit() {
		this.pending = true;
		this.members$ = this.memberSrv.selectMembers().pipe(
			tap(() => {
				if (this.initialLoading) {
					this.pending = false;
					this.initialLoading = false;
				}
			})
		);
		this.selected$ = this.selectionSrv.selection$;
		this.menuCollapsed$ = this.menuSrv.collapsed$;
		this.menuCollapsed$.subscribe(menuCollapsed => this.menuCollapsed);
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		this.page++;
		this.pending = true;
		this.memberSrv.loadMembersNextPage({ page: this.page, sort: this.currentSort }).then(() => {
			this.pending = false;
		});
	}

	onSort(sort: Sort) {
		this.currentSort = sort;
		this.pending = true;
		this.memberSrv.sortMembers({ sort }).then(() => {
			this.pending = false;
		});
	}

	/** Opens the dialog for creating a new team */
	openNewTeamDialog() {
		this.dlgSrv.open(NewTaskDlgComponent);
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgSrv.open(InviteUserDlgComponent);
	}

	/** When a member has been selected */
	selectItem(entityId: string) {
		this.selectionSrv.selectOne(entityId);
	}

	/** When a member has been unselected */
	unselectItem(entityId: string) {
		this.selectionSrv.unselectOne(entityId);
	}

	/** When all members have been selected at once (from the table) */
	selectAll(ids: string[]) {
		this.selectionSrv.selectAll(ids);
	}

	/** reset the selection of members */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	/** Navigates to a member details page */
	onItemOpened(entityId: string) {
		// this.router.navigate(['/member', 'details', entityId]);
	}

	accessTypeUpdated({ member, accessType }: { member: TeamUser; accessType: string }) {
		// TODO: Thiery I believe this if/else doesn't do anything
		// if (member) {
		// 	this.memberSrv.updateMember({
		// 		...member,
		// 		accessType
		// 	}).subscribe();
		// } else {
		// 	this.memberSrv.updateMembers({
		// 		accessType
		// 	}).subscribe();
		// }
	}

	/** Deletes the currently selected members */
	deleteSelection() {
		this.memberSrv.deleteMembers(Array.from(this.selectionSrv.selection.keys()));
		this.resetSelection();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		// const members = Array.from(this.selectionSrv.selection.keys());
		// // A callback is sent in the payload. This is an anti pattern in redux but it makes things easy here.
		// // Let's avoid doing that whenever possible though.
		// const callback = () => {
		// 	this.memberSrv.deleteMembers(members).subscribe(() => {
		// 		this.resetSelection();
		// 	});
		// };
		// const text = `Delete ${members.length} Member${members.length > 1 ? 's' : ''} ?`;
		// this.dlgSrv.open(, { text, callback });
	}
}
