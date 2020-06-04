import { flatMap, tap } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeZh from '@angular/common/locales/zh';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { CompanyService, TeamService, UserService } from '~core/auth/services';
import { ApiLibService } from '~core/api-lib';
import { SeederService } from '~core/seeder/seeder.service';

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
		private apiLibSrv: ApiLibService,
		private seederSrv: SeederService
	) {}

	ngOnInit(): void {
		this.userSrv.init();
		this.teamSrv.init();
		this.companySrv.init();
		this.analytics.init();
		this.apiLibSrv.init();

		registerLocaleData(localeEn, 'en-EN');
		registerLocaleData(localeFr, 'fr-FR');
		registerLocaleData(localeEs, 'es-ES');
		registerLocaleData(localeZh, 'zh-CH');
		this.translate.setDefaultLang('en-US');
		this.translate.use('en-US');


		this.seederSrv.seed();
	}

}
