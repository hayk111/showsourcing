import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Packaging } from '~core/models';

@Component({
	selector: 'packaging-app',
	templateUrl: './packaging.component.html',
	styleUrls: ['./packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagingComponent implements OnInit {
	@Input() packaging: Packaging;

	constructor() { }

	ngOnInit() {
	}

}
