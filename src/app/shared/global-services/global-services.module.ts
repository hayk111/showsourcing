import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, TeamService } from '~shared/global-services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [UserService, TeamService]
})
export class GlobalServicesModule { }
