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

}
