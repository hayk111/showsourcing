import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'controller-table-content-app',
	templateUrl: './controller-table-content.component.html',
	styleUrls: ['./controller-table-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerTableContentComponent {

}
