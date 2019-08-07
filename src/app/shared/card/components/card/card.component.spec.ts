import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from '~shared/card/card.module';

// Those tests are a bit overkill but it's just to satisfy the new rule that we need to create tests for new things

@Component({
	template: `
	<card-app>
		<card-header-app></card-header-app>
		<card-title-app>Title</card-title-app>
		<card-title-badge-app>78</card-title-badge-app>
		<card-action-app>Action</card-action-app>
		This is the card content
	</card-app>

`})
class TestComponent {
}


fdescribe('card component', () => {
	let host: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach( async() => {
		TestBed.configureTestingModule({
			imports: [CardModule],
			declarations: [ TestComponent ]
		});
		fixture = TestBed.createComponent(TestComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should have pd-l padding on the content', () => {
		const content = fixture.nativeElement.querySelector('card-app main');
		expect(content.className).toContain('pd-l');
	});

	it('should display an header', () => {
		const wrongElem = fixture.nativeElement.querySelector('card-app card-headerrrrrr-app');
		const elem = fixture.nativeElement.querySelector('card-app card-header-app');
		expect(wrongElem).not.toBeTruthy();
		expect(elem).toBeDefined();
	});
	it('should display header separator', () => {
		const elem = fixture.nativeElement.querySelector('card-app divider-app');
		expect(elem).toBeDefined();
	});
	it('should display title', () => {
		const elem = fixture.nativeElement.querySelector('card-app card-title-app');
		expect(elem).toBeDefined();
		expect(elem.textContent).toEqual('Title');

	});
	it('should display count, next to title', () => {
		const elem = fixture.nativeElement.querySelector('card-app card-title-badge-app');
		expect(elem).toBeDefined();
		expect(elem.textContent).toEqual('78');
	});
	it('should display actions on the right side of the card', () => {
		const elem = fixture.nativeElement.querySelector('card-app card-action-app');
		expect(elem).toBeDefined();
		expect(elem.textContent).toEqual('Action');
	});
});
