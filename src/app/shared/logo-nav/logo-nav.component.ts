import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'logo-nav',
	templateUrl: './logo-nav.component.html',
	styleUrls: ['./logo-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoNavComponent {

	@Input() title: string;
	@Input() subtitle: string;

}
