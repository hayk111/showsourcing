import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComponent } from './template.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TemplateComponent', () => {
	let component: TemplateComponent;
	let fixture: ComponentFixture<TemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TemplateComponent ],
			imports: [RouterTestingModule]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
