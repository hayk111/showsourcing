import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '~models';
import { CustomField } from '~shared/dynamic-forms/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductStatusTypeService, ProductService } from '~global-services';
import { statusToColor } from '~utils/status-to-color.function';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';


@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {

	isOpen = false;

	constructor() { }

	ngOnInit() {
		this.statusTypes$ = this.typesSrv.queryAll();
		this.products$ = this.productSrv.queryMany({ take: 10 });
		this.cols$ = combineLatest(
			this.statusTypes$,
			this.products$,
			(types: ProductStatusType[], products: Product[]) => {
				const cols: KanbanColumn[] = types.map(type => ({
					id: type.id,
					title: type.name,
					color: statusToColor(type.category),
					data: []
				}));
				const colsMap = new Map(
					cols.map(col => ([col.id, col])) as any
				);
				products.forEach(prod => {
					if (prod.status && prod.status.status) {
						const type = colsMap.get(prod.status.status.id);
						(type as any).data.push(prod);
					}
				});
				return cols;
			});
	}

	doThis(event: any) {

	}
}
