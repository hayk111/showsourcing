import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '~global-services';
import { Product } from '~models';
import { Router } from '@angular/router';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex flexCenter flexColumn'
	}
})
export class DashboardComponent implements OnInit {



}
