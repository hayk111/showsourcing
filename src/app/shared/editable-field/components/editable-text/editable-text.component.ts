import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ContentChild } from '@angular/core';
import { InputDirective } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'editable-text-app',
	templateUrl: './editable-text.component.html',
	styleUrls: ['./editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTextComponent implements OnInit {
	@Input() value;
	/** Whether click on the value should open the editor */
	@Input() editOnClick = true;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();
	@Output() saved = new EventEmitter<null>();
	@Output() canceled = new EventEmitter<null>();
	/** we are gonna query for the most commonly used selector in the app
	 *  so we can open / focus on them when we are opening the edit mode.
	 */
	@ContentChild(SelectorComponent) selector: SelectorComponent;
	@ContentChild(SelectorConstComponent) selectorConst: SelectorConstComponent;
	@ContentChild(SelectorEntityComponent) selectorEntity: SelectorEntityComponent;
	@ContentChild(InputDirective) input: InputDirective;

	isOpen = false;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() {
	}

	close(isOutsideClick?: boolean) {
		if (isOutsideClick && !this.closeOnOutsideClick) {
			return;
		}

		this.isOpen = false;
		this.closed.emit();
		// we can open it from outside so needs for cd
		this.cd.markForCheck();
	}

	cancel() {
		this.isOpen = false;
		this.canceled.emit();
	}

	save() {
		this.isOpen = false;
		this.saved.emit();
		this.closed.emit();
	}

	open(isClick?: boolean) {
		// if the click was made from the template of this component
		// and the editOnClick is disabled we shouldn't open the edit mode.
		// this will allow us to have some editable text that are only opened via a button and such.
		if (isClick && !this.editOnClick) {
			return;
		}
		this.focusInput();
		this.isOpen = true;
		// need to check for changes since we can open the edit mode from outside
		this.cd.detectChanges();
		this.opened.emit();
	}

	/** we are gonna preemptively focus common inputs */
	focusInput() {
		// set timeout because the input isn't rendered yet
		setTimeout(_ => {
			if (this.input) {
				this.input.select();
				return;
			}
			if (this.selector) {
				this.selector.open();
				return;
			}
			if (this.selectorConst) {
				this.selectorConst.open();
				return;
			}
			if (this.selectorEntity) {
				this.selectorEntity.open();
				return;
			}
		});
	}

}
