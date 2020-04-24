import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeZh from '@angular/common/locales/zh';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { CompanyService, TeamService, UserService } from '~core/auth/services';
import { ApiService } from '~core/erm3/services/api.service';

// Doctor: “Do you do sports?”

// Patient: “Does sex count?”

// Doctor: “Yes.”

// Patient: “Then no.”

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private analytics: AnalyticsService,
		private companySrv: CompanyService,
		private teamSrv: TeamService,
		private userSrv: UserService,
		private translate: TranslateService,
		private apiSrv: ApiService
	) {}

	ngOnInit(): void {
		this.userSrv.init();
		this.teamSrv.init();
		this.companySrv.init();
		this.analytics.init();
		// this.apiSrv
		// 	.create('WorkflowStatus', {
		// 		name: 'status supp',
		// 		step: 1,
		// 		inWorkflow: true,
		// 		final: false,
		// 		category: 'in_progress',
		// 		type: 'SUPPLIER'
		// 	} as any)
		// 	.subscribe();

		registerLocaleData(localeEn, 'en');
		registerLocaleData(localeFr, 'fr');
		registerLocaleData(localeEs, 'es');
		registerLocaleData(localeZh, 'zh');
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}
}
