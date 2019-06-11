import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routerAnimation } from '~core/template/components/animation';
import { TemplateService } from '~core/template/services/template.service';
import { DialogService } from '~shared/dialog';
import { OnBoardingDlgComponent } from '~shared/on-boarding/components';
import { OnBoardingService } from '~shared/on-boarding/services/on-boarding.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'template-app',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss'],
	animations: [
		routerAnimation
	]
})
export class TemplateComponent extends AutoUnsub implements OnInit {
	@ViewChild('main') main: ElementRef<HTMLElement>;

	constructor(
		private templateSrv: TemplateService,
		private onboardingSrv: OnBoardingService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		if (!this.onboardingSrv.isCompleted) {
			this.dlgSrv.open(OnBoardingDlgComponent, undefined, false);
		}
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
