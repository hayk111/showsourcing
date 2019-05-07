import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Show } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'show-list-app',
	templateUrl: './show-list.component.html',
	styleUrls: ['./show-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent extends TrackingComponent implements OnInit {
	@Input() items = [];
	@Input() pending = true;
	@Output() saveShow = new EventEmitter<Show>();

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
	}

	goToDetail(item: any) {
		this.router.navigate([item.id], { relativeTo: this.route });
	}
}
