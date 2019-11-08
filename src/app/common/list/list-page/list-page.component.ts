import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { productsJson } from '../mock-data';
import { SelectionService } from '~core/list-page';
import { ERM, Product } from '~core/models';

@Component({
	selector: 'list-page-app',
	templateUrl: './list-page.component.html',
	styleUrls: ['./list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent {

}
