import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EntityMetadata } from '~models';

@Component({
	selector: 'preview-header-app',
	templateUrl: './preview-header.component.html',
	styleUrls: ['./preview-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHeaderComponent implements OnInit {

	@Input() title: string;
	@Input() icons: string[];
	@Input() entityMD: EntityMetadata;
	@Input() entity: any;

	constructor() { }

	ngOnInit() {
	}

	getIcon() {
		switch (this.entityMD) {
			default:
				return 'product';
		}
	}

}
