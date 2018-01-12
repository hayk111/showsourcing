import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComponent } from './template.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';
import { StoreModule } from '@ngrx/store/src/store_module';
import { NotifComponent } from '../header/notif/notif.component';
import { SearchComponent } from '../header/search/search.component';
import { UserInfoComponent } from '../header/user-info/user-info.component';
import { AppStoreModule } from '../../../../store/store.module';

describe('TemplateComponent', () => {
	let component: TemplateComponent;
	let fixture: ComponentFixture<TemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TemplateComponent,
				SideNavComponent,
				HeaderComponent,
				NotifComponent,
				SearchComponent,
				UserInfoComponent
			],
			imports: [ RouterTestingModule, AppStoreModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	fit('should create', () => {
		expect(component).toBeTruthy();
	});
});
