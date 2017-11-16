import { Directive, HostListener, OnInit, HostBinding } from '@angular/core';
import { AutoUnsub } from '../../../../utils/auto-unsub.component';
import { SideNavService } from '../services/side-nav.service';

@Directive({
	selector: '[appSideNav]',
})
export class SideNavDirective extends AutoUnsub implements OnInit {

	@HostBinding('class.open') open;
	@HostBinding('attr.role') role = 'navigation';

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

	checkSidenav(b: boolean)  {
		this.open = b;
	}
}
