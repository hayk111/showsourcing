import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, first } from 'rxjs/operators';
import { Category, ERM, ReadProperty } from '~models';
import { AutoUnsub } from '~utils';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'data-management-page-app',
	template: '<router-outlet></router-outlet>',
	styleUrls: ['./data-management-page.component.scss'],
})
export class DataManagementPageComponent {

	constructor() { }
	// itemType: ReadProperty;
	// items$: Observable<any[]>;
	// selected$: Observable<Map<string, boolean>>;
	// /** whether some suppliers are currently being loaded */
	// pending: boolean;
	// /** when the suppliers are loaded for the first time */
	// initialLoading = true;
	// /** current sort used for sorting suppliers */

	// constructor(
	// 	private dataManagementSrv: DataManagementService,
	// 	private selectionSrv: SelectionService,
	// 	private route: ActivatedRoute) {
	// 	super();
	// }

	// ngOnInit() {

	// 	// we retrieve the parameters from the router given at settings.component.html link
	// 	// and then we try to find a match with our ERM
	// 	this.route.params.pipe(
	// 		takeUntil(this._destroy$)
	// 	).subscribe(params => this.itemType = new ERM().getReadProperty(params.id));

	// 	this.pending = true;
	// 	this.items$ = this.dataManagementSrv.selectItems(this.itemType).pipe(
	// 		tap(() => {
	// 			if (this.initialLoading) {
	// 				this.pending = false;
	// 				this.initialLoading = false;
	// 			}
	// 		})
	// 	);
	// 	this.selected$ = this.selectionSrv.selection$;
	// }

	// /** When a supplier has been selected */
	// selectItem(entityId: string) {
	// 	this.selectionSrv.selectOne(entityId);
	// }

	// /** When a supplier has been unselected */
	// unselectItem(entityId: string) {
	// 	this.selectionSrv.unselectOne(entityId);
	// }

	// /** When all suppliers have been selected at once (from the table) */
	// selectAll(ids: string[]) {
	// 	this.selectionSrv.selectAll(ids);
	// }

	// /** reset the selection of suppliers */
	// resetSelection() {
	// 	this.selectionSrv.unselectAll();
	// }

	// onSort(sort: any) {
	// }

	// removeEntity(entity: any) {
	// 	this.dataManagementSrv.deleteItem(this.itemType, entity).subscribe();
	// }

	// mergeSelected() {

	// }

	// removeSelected() {

	// }

	// openNewEntityDialog() {

	// }
}
