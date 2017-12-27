import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { selectEntity } from '../../../../store/selectors/utils.selector';
import { selectIsSidenavOpen } from '../../../../store/selectors/sidenav.selector';
import { SidenavActions } from '../../../../store/action/sidenav.reducer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { throttleTime } from 'rxjs/operators/throttleTime';
import { sampleTime } from 'rxjs/operators/sampleTime';

@Component({
	selector: 'side-nav-app',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent extends AutoUnsub implements OnInit {

	open$: Observable<boolean>;
	open: boolean;
	private debouncer = new Subject<any>();

	constructor(private store: Store<any>) { super(); }

	ngOnInit() {
		this.open$ = this.store.select(selectIsSidenavOpen);
		this.open$.takeUntil(this._destroy$).subscribe(b => this.open = b);
		this.onResize();
		this.debouncer.takeUntil(this._destroy$).pipe(
			sampleTime(300)
		).subscribe(r => this.resize(r));
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (window.innerWidth < 900)
			this.debouncer.next(SidenavActions.close());
		else
			this.debouncer.next(SidenavActions.open());
	}

	resize(r) {
		this.store.dispatch(r);
	}

	toggle() {
		this.store.dispatch(SidenavActions.toggle());
	}


	get menuIcon() {
		// returns the correct material icon
		return this.open ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
	}
}
