import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerAnimation } from '~core/template/components/animation';
import { TemplateService } from '~core/template/services/template.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'template-app',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss'],
	animations: [
		routerAnimation
	]
})
export class TemplateComponent extends AutoUnsub implements AfterViewInit {
	@ViewChild('main') main: ElementRef<HTMLElement>;

	constructor(
		private templateSrv: TemplateService,
		private router: Router
	) {
		super();
	}

	ngAfterViewInit() {
		this.router.events.pipe(
			takeUntil(this._destroy$)
		).subscribe(evt => {
			this.main.nativeElement.scrollTop = 0;
		});
	}


	/**
	 * Notifies the service we have reached the bottom of the page,
	 *
	 * This is used in some pages to load content
	 */
	onBottomReached() {
		this.templateSrv.bottomReached();
	}

}
