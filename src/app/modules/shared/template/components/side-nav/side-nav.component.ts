import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { SideNavService } from '../../services/side-nav.service';

@Component({
	selector: 'side-nav-app',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent extends AutoUnsub implements OnInit {

	open;

	constructor(public sidenav: SideNavService) { super(); }

	ngOnInit() {
		this.sidenav.isOpen
			.takeUntil(this._destroy$)
			.subscribe((b: boolean) => this.checkSidenav(b));
		this.onResize();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (window.innerWidth < 900)
			this.sidenav.close();
		else
			this.sidenav.open();
	}

	toggle() {
		this.sidenav.toggle();
	}

	checkSidenav(b: boolean)  {
		this.open = b;
	}

	get menuIcon() {
		// returns the correct material icon
		return this.open ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
	}
}
