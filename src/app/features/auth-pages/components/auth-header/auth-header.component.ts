import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'auth-form-header-app',
	templateUrl: './auth-header.component.html',
	styleUrls: ['./auth-header.component.scss', '../form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormHeaderComponent extends AutoUnsub {
	@Input() pending = false;
	@Input() subDescription = '';
}

