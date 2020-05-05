import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { InputPriceMatrixComponent } from './input-price-matrix.component';

describe('InputPriceMatrixComponent', () => {
	let component: InputPriceMatrixComponent;
	let fixture: ComponentFixture<InputPriceMatrixComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputPriceMatrixComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputPriceMatrixComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
