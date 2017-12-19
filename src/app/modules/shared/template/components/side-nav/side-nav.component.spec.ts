import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store/src/store_module';
import { reducers } from '../../../../store/reducer/_reducers';
import { AppStoreModule } from '../../../../store/store.module';

describe('SideNavComponent', () => {
	let component: SideNavComponent;
	let fixture: ComponentFixture<SideNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				AppStoreModule,
				MatIconModule
			],
			declarations: [ SideNavComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SideNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
