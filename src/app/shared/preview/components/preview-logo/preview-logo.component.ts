import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppImage } from '~core/models';

@Component({
	selector: 'preview-logo-app',
	templateUrl: './preview-logo.component.html',
	styleUrls: ['./preview-logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewLogoComponent implements OnInit {

	@Input() image: AppImage;

	constructor() { }

	ngOnInit() {
	}

}
