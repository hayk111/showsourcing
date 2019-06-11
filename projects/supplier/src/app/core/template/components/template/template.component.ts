import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, Event, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { routerAnimation } from '~core/template/components/animation';
import { TemplateService } from '~core/template/services/template.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { takeUntil, switchMap, map, tap, filter } from 'rxjs/operators';
import { Location } from '@angular/common';

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
		private templateSrv: TemplateService
	) {
		super();
	}

	ngAfterViewInit() {

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
