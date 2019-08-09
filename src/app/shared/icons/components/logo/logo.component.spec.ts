import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent, colorMap } from './logo.component';
import { EntityName, AppImage } from '~core/models';
import { IconsModule } from '~shared/icons/icons.module';





fdescribe('Logo component', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;
	let el: HTMLElement;
	let i: HTMLElement;

	function change() {
		fixture.detectChanges();
		component.ngOnChange();
	}

	beforeEach(async () => {
		TestBed.configureTestingModule({ imports: [IconsModule] });
		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		el = fixture.nativeElement;
		i = el.querySelector('i');


		component.type = EntityName.PRODUCT;
		component.size = 'm';
		change();
	});

	fit('should change size to size as number input', () => {
		component.size = 24;
		change();
		const rect = el.getBoundingClientRect();
		expect(rect.height).toEqual(24);
		expect(rect.width).toEqual(24);
	});

	fit('should have the correct medium size', () => {
		// putting a wrong value at first just in case previous state has impact
		component.size = 24;
		change();
		component.size = 'm';
		change();
		component.ngOnChange();
		const rect = el.getBoundingClientRect();
		expect(rect.height).not.toEqual(24);
		expect(rect.height).toEqual(32);
		expect(rect.width).toEqual(32);
		expect(i.style.fontSize).toEqual('16px');

	});

	it('should have the correct large sizes', () => {
		component.size = 'l';
		change();
		const rect = el.getBoundingClientRect();
		expect(rect.height).toEqual(36);
		expect(rect.width).toEqual(36);
		expect(i.style.fontSize).toEqual('23px');
	});

	it('should have the correct extra large sizes', () => {
		component.size = 'xl';
		change();
		const rect = el.getBoundingClientRect();
		expect(rect.height).toEqual(92);
		expect(rect.width).toEqual(92);
		expect(i.style.fontSize).toEqual('40px');
	});

	it('should change size of icon if iconSize is specified', () => {
		component.size = 'l';
		component.iconSize = 17;
		change();
		expect(i.style.fontSize).toEqual('17px');
		component.size = 50;
		component.iconSize = 19;
		change();
		expect(i.style.fontSize).toEqual('19px');
	});

	it('should display logo (image) if supplied', () => {
		const urls = ['xs', 's', 'm', 'l', 'xl'].map(size => ({
			url: `https://files.showsourcing.com/${size}/18511884-666d-4518-8380-8e2c1fe6908a.jpg`,
			__typename: 'ImageUrl',
			id: '',
			maxHeight: 1,
			maxWidth: 1
		}));
		const appImage: AppImage = {
			fileName: 'test.jpg',
			urls,
			__typename: 'Image',
		} as any;
		component.logo = appImage;
		change();
		const img = el.querySelector('img');
		expect(img).toBeDefined();
	});

	it('should display the entity icon if no image specified', () => {});

	it('should display the colors of the color input', () => {});

	it('should display the colors depending on the entity if no color specified', () => {
		Object.entries(colorMap).forEach(([name, color]) => {
			component.type = name as EntityName;
			fixture.detectChanges();
			expect(component.color).toEqual(color);
		});
	});

	it('should be circle if circle is true', () => {
		component.circle = true;
		fixture.detectChanges();
		expect(el.className).toContain('circle');
	});

	it('should not have background if background is false', () => {

	});
});


