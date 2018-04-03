import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project } from '~app/entity';

@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent implements OnInit {
	projects$: Observable<Project>;
	constructor(private store: Store<any>) {

	}

	ngOnInit() {
	}

}
