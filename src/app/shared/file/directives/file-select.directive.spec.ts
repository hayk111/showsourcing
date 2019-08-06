import { FileSelectDirective } from './file-select.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

@Component({
	template: `
	<input fileSelect type="file"/>
	`
})

class TestFileSelectComponent { }

describe('FileSelectDirective', () => {
	let component: TestFileSelectComponent;
	let directive: FileSelectDirective;
	let debugEl: DebugElement;
	let fixture: ComponentFixture<TestFileSelectComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [FileSelectDirective, TestFileSelectComponent] });
		fixture = TestBed.createComponent(TestFileSelectComponent);
		component = fixture.componentInstance;
		debugEl = fixture.debugElement.query(By.directive(FileSelectDirective));
		directive = debugEl.injector.get(FileSelectDirective);
		fixture.detectChanges();
	});

	it('should create TestFileSelectComponent', () => {
		expect(component).toBeDefined();
	});

	it('should call onFileDrop when there is a drop event', () => {
		spyOn(directive, 'onFileDrop');
		debugEl.triggerEventHandler('change', {});
		expect(directive.onFileDrop).toHaveBeenCalled();
	});

	it('should output the files that when onFileDrop is called', () => {
		spyOn(directive.fileSelect, 'emit').and.callThrough();
		const file = new File([''], 'dummy.jpg');
		const fileDropEvent = { preventDefault: () => {}, stopPropagation: () => {}, target: { files: [file, file, file] }};
		let outputFiles;

		directive.fileSelect.pipe(first()).subscribe(f => outputFiles = f);
		directive.onFileDrop(fileDropEvent);
		expect(directive.fileSelect.emit).toHaveBeenCalled();
		expect(outputFiles.length).toBe(3);
		expect(outputFiles[0]).toBe(file);
	});

});
