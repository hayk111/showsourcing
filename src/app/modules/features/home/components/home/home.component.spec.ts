import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';



describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HomeComponent ],
			providers: [
				{ provide: Store, useValue: {select: () => {}}}
			],
			imports: []
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
