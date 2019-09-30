import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Team, User } from '~models';
import { CompanyService, UserService, TeamUserService } from '~core/entity-services';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { ERM, Company } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-company-app',
	templateUrl: './settings-company.component.html',
	styleUrls: ['./settings-company.component.scss']
})
export class SettingsCompanyComponent implements OnInit {
	erm = ERM;
	company: Company;

	constructor(
		private companySrv: CompanyService,
		private userSrv: UserService,
	) {}

	ngOnInit() {
		this.company = this.companySrv.companySync;
	}
}
