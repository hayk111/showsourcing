import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'logo-nav',
	templateUrl: './logo-nav.component.html',
	styleUrls: ['./logo-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex clickable pd-ms' // TODO: michael this is a note, I added
		// clickable class on the accordion merge request
	}
})
export class LogoNavComponent {

	@Input() title: string;
	@Input() subtitle: string;

}
