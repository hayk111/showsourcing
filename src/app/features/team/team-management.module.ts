import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamManagementPageComponent } from './components';
import { routes } from './routes';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: [TeamManagementPageComponent],
})
export class TeamManagementModule { }
