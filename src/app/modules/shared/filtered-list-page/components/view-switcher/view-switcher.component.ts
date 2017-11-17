import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewSwitcherAction } from '../../../../store/action/view-switcher.action';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

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
		this.view$ = this.store.select('viewSwitcher');
	}
	
	switchView(view: string) {
		this.store.dispatch(ViewSwitcherAction.switchView(view));
	}

}
