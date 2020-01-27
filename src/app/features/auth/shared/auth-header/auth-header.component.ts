import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'auth-header-app',
	templateUrl: './auth-header.component.html',
	styleUrls: ['./auth-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flexCenter flexColumn' }
})
export class AuthFormHeaderComponent extends AutoUnsub {
	@Input() pending = false;

	@Input() title = 'header.welcome-to-showsourcing';
	@Input() hasTitle = true;
	@Input() subtitle = 'text.your-collab-plat';
	@Input() hasSubtitle = true;
	@Input() instruction = 'Please fill in the form below';
	@Input() hasInstruction = true;
	@Input() pendingInfo = 'We are processing your request';
}

