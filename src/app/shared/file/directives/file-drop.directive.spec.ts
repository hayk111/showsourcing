import { FileDropDirective } from "./file-drop.directive";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { first } from "rxjs/operators";

@Component({
	template: `
		<div fileDrop style="visibility: hidden">You can drop a file here</div>
	`
})
class TestComponent {}

xdescribe("FileDropDirective", () => {
	let directive: FileDropDirective;
	let dest: DebugElement;

	beforeEach(() => {
		const fixture = TestBed.configureTestingModule({
			declarations: [FileDropDirective, TestComponent]
		}).createComponent(TestComponent);
		dest = fixture.debugElement.query(By.directive(FileDropDirective));
		directive = dest.injector.get(FileDropDirective);
		fixture.detectChanges();
	});

	it("should call onFileDrop when there is a drop event", () => {
		spyOn(directive, "onFileDrop");
		dest.triggerEventHandler("drop", new DragEvent("drop"));
		expect(directive.onFileDrop).toHaveBeenCalled();
	});

	it("should output the files that when onFileDrop is called", () => {
		spyOn(directive.fileDrop, "emit").and.callThrough();
		const file = new File([""], "dummy.jpg");
		const fileDropEvent = {
			preventDefault: () => {},
			dataTransfer: { files: [file, file, file] }
		};
		let outputFiles;

		directive.fileDrop.pipe(first()).subscribe(f => (outputFiles = f));
		directive.onFileDrop(fileDropEvent);
		expect(directive.fileDrop.emit).toHaveBeenCalled();
		expect(outputFiles.length).toBe(3);
		expect(outputFiles[0]).toBe(file);
	});
});
