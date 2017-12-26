import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './components/template/template.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { GuestTemplateComponent } from './components/guest-template/guest-template.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material';
import { SearchComponent } from './components/header/search/search.component';
import { NotifComponent } from './components/header/notif/notif.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		CardsModule,
		MatIconModule
	],
	providers: [  ],
	declarations: [ TemplateComponent, GuestTemplateComponent,
			HeaderComponent, SideNavComponent, SearchComponent, NotifComponent, UserInfoComponent ],
})
export class TemplateModule { }
