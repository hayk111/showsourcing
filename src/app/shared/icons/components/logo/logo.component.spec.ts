import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { EntityName, imageMock } from '~core/models';
import { IconsModule } from '~shared/icons/icons.module';
import { Color, IconUtils, Size } from '~utils';


const colors = Object.values(Color);
const types = [
	EntityName.CATEGORY,
	EntityName.COMMENT,
	EntityName.CONTACT,
	EntityName.EVENT,
	EntityName.PRODUCT,
	EntityName.PROJECT,
	EntityName.SAMPLE,
	EntityName.TAG,
	EntityName.TASK,
	EntityName.SUPPLIER,
];


describe('Logo component', () => {
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
	});

	it('should display [logo] (image) if supplied', () => {
		component.logo = imageMock;
		fixture.detectChanges();
		const img = el.querySelector('img');
		expect(img).toBeTruthy();
		// small size
		expect(img.src).toEqual(imageMock.urls[1].url);
	});

	it('should display the colors of the [color] input', () => {
		colors.forEach(color => {
			component.color = color;
			fixture.detectChanges();
			expect(el.className).toContain(color);
		});
	});

	it('should display the color depending on the entity if no [color] specified', () => {
		Object.entries(IconUtils.iconsColorMap).forEach(([name, color]) => {
			component.type = name as EntityName;
			fixture.detectChanges();
			expect(el.className).toContain(color);
		});
	});

	it('should be circle if [circle] is true', () => {
		component.circle = true;
		fixture.detectChanges();
		expect(el.className).toContain('circle');
	});

	it('Should use [size] "s" | "m" | "l" | "xl" ', () => {
		Object.entries(IconUtils.iconsSizeMap).forEach(([sizeName, sizes]: [Size, { background: number, icon: number, font: number }]) => {
			component.size = sizeName;
			fixture.detectChanges();
			expect(el.style.height).toEqual(`${sizes.background}px`);
			expect(el.style.width).toEqual(`${sizes.background}px`);
			expect(el.style.fontSize).toEqual(`${sizes.icon}px`);
		});
	});

	it('Should set the [iconSize] if defined', () => {
		component.iconSize = 13;
		fixture.detectChanges();
		expect(el.style.fontSize).toEqual('13px');
	});

	it('Should set [backgroundSize] if defined', () => {
		component.backgroundSize = 30;
		fixture.detectChanges();
		expect(el.style.height).toEqual('30px');
		expect(el.style.width).toEqual('30px');
	});

	it('should display the [icon] icon if no [logo] specified', () => {
		types.forEach(type => {
			const newFixture = TestBed.createComponent(LogoComponent);
			const newComponent = newFixture.componentInstance;
			const newEl = newFixture.nativeElement;
			newComponent.icon = 'files';
			newComponent.type = type;
			newFixture.detectChanges();
			const i = newEl.querySelector('i');
			expect(i.className).toContain('files');
		});
	});


	it('should display the [type] icon if no [logo] nor [icon] specified', () => {
		types.forEach(type => {
			const newFixture = TestBed.createComponent(LogoComponent);
			const newComponent = newFixture.componentInstance;
			const newEl = newFixture.nativeElement;
			newComponent.type = type;
			newFixture.detectChanges();
			const i = newEl.querySelector('i');
			expect(i.className).toContain(IconUtils.iconsMap[type]);
		});
	});

});


