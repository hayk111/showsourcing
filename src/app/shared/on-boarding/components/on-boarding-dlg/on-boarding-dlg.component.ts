import { Component, OnInit, ChangeDetectionStrategy, HostListener, forwardRef, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { OnBoardingService } from '../../services/on-boarding.service';

@Component({
	selector: 'on-boarding-dlg-app',
	templateUrl: './on-boarding-dlg.component.html',
	styleUrls: ['./on-boarding-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnBoardingDlgComponent implements OnInit {
	@ViewChild('transition') transitionElem: ElementRef<HTMLElement>;
	pending = true;

	constructor(
		public onboardingSrv: OnBoardingService,
		private renderer: Renderer2,
		private cd: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.preload();
	}

	async preload() {
		await this.onboardingSrv.preloadImgs();
		this.pending = true;
		this.cd.markForCheck();
	}

	@HostListener('document:keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {
		switch (event.keyCode) {
			case LEFT_ARROW: this.back();
				break;
			case RIGHT_ARROW: this.next();
				break;
			case ESCAPE: this.complete();
				break;
		}
	}

	get currentScreen() {
		return this.onboardingSrv.currentScreen;
	}

	isLast() {
		return this.onboardingSrv.isLast();
	}

	isFirst() {
		return this.onboardingSrv.isFirst();
	}

	next() {
		this.onboardingSrv.next();
	}

	back() {
		this.onboardingSrv.back();
	}

	complete() {
		this.onboardingSrv.complete();
	}

}
