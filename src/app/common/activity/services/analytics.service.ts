import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Hubspot } from 'angulartics2/hubspot';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import { UserService } from '~core/entity-services/user/user.service';

interface Properties {
	id: string;
	name: string;
	entity: string;
	date: Date;
	type: string;
}

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {

	constructor(
		private angulartics: Angulartics2,
		private mixpanel: Angulartics2Mixpanel,
		private hubspot: Angulartics2Hubspot,
		private userSrv: UserService
	) { }

	init() {
		this.mixpanel.startTracking();
		this.hubspot.startTracking();
		this.userSrv.selectUser().subscribe(user => {
			// MixPanel
			this.mixpanel.setUsername(user.id);
			this.mixpanel.setUserProperties({
				$first_name: user.firstName,
				$last_name: user.lastName,
				$eail: user.email
			});

			// Hubspot
			this.hubspot.setUserProperties({
				uniqueId: user.id,
				first_name: user.firstName,
				last_name: user.lastName,
				email: user.email
			});
		});
	}

	evenTrack(action: string, properties: Properties) {
		this.angulartics.eventTrack.next({
			action,
			properties
		});
	}
}
