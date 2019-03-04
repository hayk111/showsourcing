import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Hubspot } from 'angulartics2/hubspot';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import { UserService } from '~core/entity-services/user/user.service';
import { allAnalyticsLoaded } from './setup';

interface Properties {
	id: string;
	name: string;
	id_element: string;
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

	async init() {
		// await allAnalyticsLoaded;
		// start the tracking of route changes
		this.mixpanel.startTracking();
		this.hubspot.startTracking();
		this.userSrv.selectUser().subscribe(user => {
			// MixPanel each analytics page has its own default user properties
			this.mixpanel.setUsername(user.id);
			this.mixpanel.setUserProperties({
				$first_name: user.firstName,
				$last_name: user.lastName,
				$email: user.email
			});

			// Hubspot each analytics page has its own default user properties
			this.hubspot.setUserProperties({
				id: user.id,
				firstname: user.firstName,
				lastname: user.lastName,
				email: user.email
			});
		});
	}

	eventTrack(action: string, properties: Properties) {
		this.angulartics.eventTrack.next({
			action,
			properties
		});
	}
}
