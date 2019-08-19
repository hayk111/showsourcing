import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityName } from '~core/models';
import { IconsModule } from '~shared/icons/icons.module';
import { IconComponent } from './icon.component';

fdescribe('Icon component', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;
	let el: HTMLElement;

	beforeEach(async () => {
		TestBed.configureTestingModule({ imports: [IconsModule] });
		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		el = fixture.nativeElement;
		component.name = EntityName.PRODUCT;
	});
	beforeEach(async () => {

	});

	it('should display the correct icomoon icon when fontSet is icomoon', () => {
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.className).toContain('icon-product');
	});

	it('should display the icon with font-size inherited when no value specifed', () => {
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.style.fontSize).toEqual('inherit');
	});

	it('should display the icon with font-size x when x is a number', () => {
		component.size = 24;
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.style.fontSize).toEqual('24px');
	});


	it('should display the icon with font-size the correct variable if a size "s" is specified', async () => {
		component.size = 's';
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.style.fontSize).toEqual('var(--font-size-icon-s)');
	});

	it('should display the icon with font-size the correct variable if a size "m" is specified', async () => {
		component.size = 'm';
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.style.fontSize).toEqual('var(--font-size-icon-m)');
	});

	it('should display the icon with font-size the correct variable if a size "l" is specified', async () => {
		component.size = 'l';
		fixture.detectChanges();
		const i = el.querySelector('i');
		expect(i.style.fontSize).toEqual('var(--font-size-icon-l)');
	});
});

