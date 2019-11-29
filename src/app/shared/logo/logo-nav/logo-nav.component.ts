import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'logo-nav-app',
	templateUrl: './logo-nav.component.html',
	styleUrls: ['./logo-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'clickable'
	}
})
export class LogoNavComponent {

	@Input() title: string;
	@Input() subtitle: string;
	@Input() selected: string;

}
