import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeZh from '@angular/common/locales/zh';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { RealmAuthenticationService } from '~core/auth/services/realm-authentication.service';
import { CompanyService, Team, TeamService, UserService } from '~core/erm';
import { log } from '~utils/log';



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
	) { }

	ngOnInit(): void {
		this.userSrv.init();
		this.teamSrv.init();
		this.companySrv.init();
		this.analytics.init();


		// TODO: move this somewhere else translate
		registerLocaleData(localeEn, 'en');
		registerLocaleData(localeFr, 'fr');
		registerLocaleData(localeEs, 'es');
		registerLocaleData(localeZh, 'zh');
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}


}
