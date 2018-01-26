import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewSwitcherAction } from '../../../../store/action/ui/view-switcher.action';
import { Observable } from 'rxjs/Observable';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';

@Component({
	selector: 'view-switcher-app',
	templateUrl: './view-switcher.component.html',
	styleUrls: ['./view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSwitcherComponent implements OnInit {
	view$: Observable<string>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.view$ = this.store.select(selectViewSwitcher);
	}

	switchView(view: string) {
		this.store.dispatch(ViewSwitcherAction.switchView(view));
	}

}
