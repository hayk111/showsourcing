import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TokenService } from '~features/auth';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { GuestClientInitializer } from '~shared/apollo';

@Component({
	selector: 'guest-template-app',
	templateUrl: './guest-template.component.html',
	styleUrls: ['./guest-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTemplateComponent {



}
