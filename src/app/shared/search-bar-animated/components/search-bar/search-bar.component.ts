import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Filter, FilterGroup } from '~shared/filters/models';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'search-bar-app',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {

}
