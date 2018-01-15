import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComponent } from './template.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppStoreModule } from '../../../../store/store.module';

describe('TemplateComponent', () => {
	let component: TemplateComponent;
	let fixture: ComponentFixture<TemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TemplateComponent
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
