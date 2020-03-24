import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { ProductService } from '~core/erm';
import { TeamService } from '~core/erm';

@Component({
	selector: 'selector-page-app',
	templateUrl: './selector-page.component.html',
	styleUrls: ['./selector-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPageComponent implements OnInit {

	product$: Observable<Product>;
	teamId = '642c327f-ac96-43cd-897b-8f04fe2dbbed';

	constructor(private teamSrv: TeamService) { }

	ngOnInit() {}

	update(item, prop) {
	}

}
