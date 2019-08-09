import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent, colorMap } from './logo.component';
import { EntityName, AppImage } from '~core/models';
import { IconsModule } from '~shared/icons/icons.module';





fdescribe('Logo component', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;
	let el: HTMLElement;


	beforeEach(async () => {
		TestBed.configureTestingModule({ imports: [IconsModule] });
		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		el = fixture.nativeElement;

		component.type = EntityName.PRODUCT;
		component.size = 'm';
		fixture.detectChanges();
	});

	fit('should change size depending of the size input which can be number or string', () => {
		component.size = 24;
		fixture.detectChanges();
		let rect = el.getBoundingClientRect();
		const i = el.querySelector('i');
		expect(rect.height).toEqual(24);
		expect(rect.width).toEqual(24);
		component.size = 'm';
		fixture.detectChanges();
		rect = el.getBoundingClientRect();
		expect(rect.height).toEqual(32);
		expect(rect.width).toEqual(32);
		expect(i.style.fontSize).toEqual('16px');
		// component.size = 'l';
		// fixture.detectChanges();
		// rect = el.getBoundingClientRect();
		// expect(rect.height).toEqual(36);
		// expect(rect.width).toEqual(36);
		// component.size = 'xl';
		// fixture.detectChanges();
		// rect = el.getBoundingClientRect();
		// expect(rect.height).toEqual(92);
		// expect(rect.width).toEqual(92);
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
		expect(el.className).toContain('circle');
	});

	it('should not have background if background is false', () => {

	});
});


