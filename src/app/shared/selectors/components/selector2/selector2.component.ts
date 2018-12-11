import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SelectorsService } from '~shared/selectors/services/selectors.service';

@Component({
	selector: 'selector2-app',
	templateUrl: './selector2.component.html',
	styleUrls: ['./selector2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Selector2Component implements OnInit {

	@Input() values: any;
	/**  the type of entity we gonna select from. */
	@Input() set type(type: string) {
		this._type = type;
		this.type$.next(type);
	}
	get type(): string {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = true;

	private _type;
	private type$ = new ReplaySubject<string>(1);

	choices$: Observable<any[]> = this.type$.pipe(
		distinctUntilChanged(),
		switchMap(type => this.getChoices(type))
	);


	constructor(private selectorSrv: SelectorsService) { }

	ngOnInit() {
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string) {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers();
			case 'product': return this.selectorSrv.getProducts();
			case 'category': return this.selectorSrv.getCategories();
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags();
			// case 'supplierType': return this.selectorSrv.getSupplierTypes();
			case 'user': return this.selectorSrv.getUsers();
			case 'currency': return this.selectorSrv.getCurrencies();
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

}
