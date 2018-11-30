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
export class TestPageComponent {

}
