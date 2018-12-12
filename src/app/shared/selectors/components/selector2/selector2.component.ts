import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';
import { TrackingComponent } from '~utils/tracking-component';

import { SelectorCurrencyRowComponent } from '../selector-currency-row/selector-currency-row.component';

@Component({
	selector: 'selector2-app',
	templateUrl: './selector2.component.html',
	styleUrls: ['./selector2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Selector2Component extends TrackingComponent implements AfterViewInit {

	@Input() values: any;

	private _type;
	@Input() set type(type: string) {
		this._type = type;
		this.type$.next(type);
	}
	get type(): string {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = true;

	private type$ = new ReplaySubject<string>(1);

	choices$: Observable<any[]> = this.type$.pipe(
		switchMap(type => this.getChoices(type, this.searchTxt))
	);

	/**
	 * items inside the virtual scroll that are needed for the cdk a11y selection with arrow keys
	 * each row on the virtual scroll has to implement the AbstractSelectorHighlightableComponent,
	 * since they keyManager needs it to update state of selection
	*/
	@ViewChildren(SelectorCurrencyRowComponent) virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
	/** cdk virtual scroll viewport so we can determine the scroll index in combination with cdk a11y */
	@ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

	/** key manager that controlls the selection with arrowkeys  */
	keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;
	/** index when using manager keys and virtual scrolling */
	count = 0;
	searchTxt = '';


	constructor(private selectorSrv: SelectorsService) { super(); }

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
	}

	search(text) {
		this.searchTxt = text;
		this.type$.next(this.type);
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string, searchTxt: string): Observable<any[]> {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers(searchTxt);
			case 'product': return this.selectorSrv.getProducts(searchTxt);
			case 'category': return this.selectorSrv.getCategories(searchTxt);
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags(searchTxt);
			// case 'supplierType': return this.selectorSrv.getSupplierTypes();
			case 'user': return this.selectorSrv.getUsers(searchTxt);
			case 'currency': return this.selectorSrv.getCurrenciesGlobal(searchTxt);
			case 'project': return this.selectorSrv.getProjects(searchTxt);
			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	/** CDK virtual scroll needs the height of the element */
	getHeight() {
		switch (this.type) {
			case 'supplier': return 64;
			default: return 37;
		}
	}

	onKeydown(event) {
		if (event.keyCode === ENTER) {
			// here add the item selected to the value
			// this.keyManager.activeItem.getLabel();
		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			// console.log(this.keyManager.activeItemIndex);
			this.keyManager.onKeydown(event);
			// const indexItem = this.keyManager.activeItemIndex;
			// console.log(indexItem);
			// if (indexItem > 0) {
			// 	if (this.count === 0 && indexItem % 6 === 0)
			// 		this.count += 6;
			// 	else if (event.keyCode === DOWN_ARROW && indexItem % 9 === 0)
			// 		this.count += 6;
			// 	else if (event.keyCode === UP_ARROW && indexItem % 2 === 0)
			// 		this.count -= 6;
			// }
			// this.cdkVirtualScrollViewport.scrollToIndex(this.count);
		}
	}
}
