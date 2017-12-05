import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './components/template/template.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { GuestTemplateComponent } from './components/guest-template/guest-template.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavDirective } from './directives/side-nav.directive';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material';
import { SideNavService } from './services/side-nav.service';
import { SearchComponent } from './components/header/search/search.component';
import { NotifComponent } from './components/header/notif/notif.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		MatIconModule
	],
	providers: [ SideNavService ],
	declarations: [ TemplateComponent, GuestTemplateComponent,
			HeaderComponent, SideNavDirective, SideNavComponent, SearchComponent, NotifComponent, UserInfoComponent ],
})
export class TemplateModule { }
