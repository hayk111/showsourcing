import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FilterService, Filter } from '~shared/filters';
import { Supplier } from '~models';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogName, DialogService } from '~shared/dialog';
import { SortEvent } from '~shared/table/components/sort-event.interface';
import { AutoUnsub } from '~utils';
import { TeamUser } from '~models';
import { SelectionService } from '../../services/selection.service';
import { MemberService } from '~features/settings/services/member.service';
import { MenuService } from '~features/settings/services/menu.service';

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
	sort$: Subject<SortEvent> = new Subject();
	/** current filters applied to members */
	filters$: Observable<Filter[]>;
	pagination$: Observable<any>;
	currentSort: SortEvent = { sortBy: 'name', sortOrder: 'ASC' };
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
	// keeps tracks of the current selection
	selection = new Map<string, boolean>();

	constructor(
		private router: Router,
		private memberSrv: MemberService,
		private selectionSrv: SelectionService,
		private dlgSrv: DialogService,
		private filterSrv: FilterService,
		private menuSrv: MenuService,
		private cdr: ChangeDetectorRef) {
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
		// this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
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

	onSort(sort: SortEvent) {
		this.currentSort = sort;
		this.pending = true;
		this.memberSrv.sortMembers({ sort }).then(() => {
			this.pending = false;
		});
	}

	/** Opens the dialog for creating a new member */
	openNewDialog() {
		this.dlgSrv.open(DialogName.INVITE_USER);
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
	selectAll() {
		this.selectionSrv.selectAll(this.members.map(s => s.id));
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
		if (member) {
			this.memberSrv.updateMember({
				...member,
				accessType
			}).subscribe();
		} else {
			this.memberSrv.updateMembers({
				accessType
			}).subscribe();
		}
	}

	/** Deletes the currently selected members */
	deleteSelection() {
		this.memberSrv.deleteMembers(Array.from(this.selectionSrv.selection.keys()));
		this.resetSelection();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected(member: TeamUser) {
		let selection = this.selection;
		if (member) {
			selection = new Map<string, boolean>();
			selection.set(member.id, true);
		}
		// A callback is sent in the payload. This is an anti pattern in redux but it makes things easy here.
		// Let's avoid doing that whenever possible though.
		const callback = () => {
			const members: Array<string> = new Array();
			selection.forEach((value, key) => {
				if (value) members.push(key);
			});
			this.memberSrv.deleteMembers(members).subscribe(() => {
				this.resetSelection();
				this.cdr.detectChanges();
			});
		};
		const text = `Delete ${selection.size} Member${selection.size > 1 ? 's' : ''} ?`;
		this.dlgSrv.open(DialogName.CONFIRM, { text, callback });
	}
}
