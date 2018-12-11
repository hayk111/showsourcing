import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { SelectorCurrencyRowComponent } from '../selector-currency-row/selector-currency-row.component';
import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { SelectorTextRowComponent } from '../selector-text-row/selector-text-row.component';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector2-app',
	templateUrl: './selector2.component.html',
	styleUrls: ['./selector2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Selector2Component implements OnInit, AfterViewInit {

	@ViewChildren(SelectorCurrencyRowComponent) items: QueryList<AbstractSelectorHighlightableComponent>;
	private keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;

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
		distinctUntilChanged(),
		switchMap(type => this.getChoices(type))
	);

	toPrint = '';

	constructor(private selectorSrv: SelectorsService) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string): Observable<any[]> {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers();
			case 'product': return this.selectorSrv.getProducts();
			case 'category': return this.selectorSrv.getCategories();
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags();
			// case 'supplierType': return this.selectorSrv.getSupplierTypes();
			case 'user': return this.selectorSrv.getUsers();
			case 'currency': return this.selectorSrv.getCurrenciesGlobal();
			case 'project': return this.selectorSrv.getProjects();
			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	/** CDK virtual scroll needs the height of the element */
	getHeight() {
		switch (this.type) {
			case 'supplier': return 63;
			default: return 37;
		}
	}

	onKeydown(event) {
		if (event.keyCode === ENTER) {
			this.toPrint = this.keyManager.activeItem.getLabel();
		} else {
			this.keyManager.onKeydown(event);
		}
	}

}
