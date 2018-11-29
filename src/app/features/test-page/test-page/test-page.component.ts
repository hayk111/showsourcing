import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier, ProductStatusType, Product } from '~models';
import { CustomField } from '~shared/dynamic-forms/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductStatusTypeService, ProductService } from '~entity-services';
import { statusToColor } from '~utils/status-to-color.function';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';


@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
	cols = [
		{
			id: 'col-1',
			data: ['hey', 'hola', 'bonjour'],
			title: 'HELLO',
			color: 'var(--color-primary)'
		},
		{
			id: 'col-2',
			data: ['How are you?', 'Como estas ?', 'ca va ?'],
			title: 'WHATs UP',
			color: 'var(--color-accent)'
		}
	];
	projectId = '7c4f007d-c671-47b4-bb33-e0a9732732d5';
	statusTypes$;
	products$;
	cols$;
	constructor(
		private render: Renderer2,
		private typesSrv: ProductStatusTypeService,
		private productSrv: ProductService
	) { }

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
