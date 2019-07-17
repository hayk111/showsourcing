
import { FileDropDirective } from './file-drop.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// To Co: I used this directive to show you dom interaction

// doc here https://jasmine.github.io/2.0/introduction.html
// and there https://angular.io/guide/testing



@Component({
	template: `
	<div fileDrop> You can drop a file here </div>
	<div> You can't drop here </div>
	`
})
class TestComponent { }



describe('FileDropDirective', () => {

	let des: HTMLElement;
	let bareDiv: HTMLElement;

	beforeEach(() => {
		let fixture = TestBed.configureTestingModule({ declarations: [ FileDropDirective, TestComponent ] }).createComponent(TestComponent);
		let element = fixture.nativeElement;
		fixture.detectChanges();

		// all elements with an attached FileDropDirective
		des = element.querySelector('div[fileDrop]');
		// the div without the FileDropDirective
		bareDiv = element.querySelector('div:not([fileDrop])');
	});

	it('should create', () => {
		const directive = new FileDropDirective();
		expect(directive).toBeTruthy();
  });

	it('should output file drop when file droped', () => {
		const file = new File([''], 'dummy.txt'); // got my file right there, want to drop it on "des"
		// des.dispatchEvent(new DragEvent('drop', { dataTransfer: { items: [ new DataTransferItem(file)] } }));
		// ...
	});

});