import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent, colorMap } from './logo.component';
import { EntityName, AppImage } from '~core/models';





describe('Logo component', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;
	let el: HTMLElement;


	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [LogoComponent] });
		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		el = fixture.nativeElement;

		component.type = EntityName.PRODUCT;
		component.size = 'm';
		fixture.detectChanges();
	});

	it('should change size depending of the size input which can be number or string', () => {
		component.size = 32;
		fixture.detectChanges();
		let rect = el.getBoundingClientRect();
		expect(rect.height).toEqual(32);
		expect(rect.bottom).toEqual(32);
		component.size = 'l';
		fixture.detectChanges();
		rect = el.getBoundingClientRect();
		debugger;
		expect(rect.height).toEqual(32);
		expect(rect.bottom).toEqual(32);
	});

	it('should change size of icon if iconSize is specified', () => {
		component.iconSize = 17;
		fixture.detectChanges();
		const ic = el.querySelector('i');
		expect(ic.style.fontSize).toEqual('17px');
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
		fixture.detectChanges();
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
		const bg: HTMLElement = el.querySelector('.background');
		expect(bg.className).toContain('circle');
	});

	it('should not have background if background is false', () => {

	});
});


