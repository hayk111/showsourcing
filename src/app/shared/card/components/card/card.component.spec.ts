import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from '~shared/card/card.module';
import { CardComponent } from './card.component';

// Those tests are a bit overkill but it's just to satisfy the new rule that we need to create tests for new things

@Component({
	template: `
	<card-app id="first" #first>
		<card-header-app></card-header-app>
		<card-title-app>Title</card-title-app>
		<card-title-badge-app>78</card-title-badge-app>
		<card-action-app>Action</card-action-app>
		This is the card content
	</card-app>

	<card-app id="second" #second>
		Just content
	</card-app>
`})
class TestComponent {
	@ViewChild('first', { static: true }) firstCard: CardComponent;
	@ViewChild('second', { static: true }) secondCard: CardComponent;
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
		const content = fixture.nativeElement.querySelector('#first main');
		expect(content.className).toContain('pd-l');
	});

	it('should display an header', () => {
		const elem = fixture.nativeElement.querySelector('#first card-header-app');
		expect(elem).toBeTruthy();
		const elem2 = fixture.nativeElement.querySelector('#second card-header-app');
		expect(elem2).not.toBeTruthy();
	});

	it('should display header separator if there is an header', () => {
		const elem = fixture.nativeElement.querySelector('#first divider-app');
		expect(elem).toBeTruthy();
		const elem2 = fixture.nativeElement.querySelector('#second divider-app');
		expect(elem2).not.toBeTruthy();
	});

	it('should display title at the top', () => {
		const elem = fixture.nativeElement.querySelector('#first card-title-app');
		expect(elem).toBeTruthy();
		expect(elem.textContent).toEqual('Title');
		const elem2 = fixture.nativeElement.querySelector('#second card-title-app');
		expect(elem2).not.toBeTruthy();
	});

	it('should display count, next to title', () => {
		const elem = fixture.nativeElement.querySelector('#first card-title-badge-app');
		expect(elem).toBeTruthy();
		expect(elem.textContent).toEqual('78');
		const elem2 = fixture.nativeElement.querySelector('#second card-title-badge-app');
		expect(elem2).not.toBeTruthy();
	});

	it('should display actions on the top right of the card', () => {
		const elem = fixture.nativeElement.querySelector('#first card-action-app');
		expect(elem).toBeTruthy();
		expect(elem.textContent).toEqual('Action');
		const elem2 = fixture.nativeElement.querySelector('#second card-action-app');
		expect(elem2).not.toBeTruthy();
	});
});
