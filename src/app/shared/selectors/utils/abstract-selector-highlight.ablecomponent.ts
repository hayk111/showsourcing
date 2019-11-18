import { Highlightable } from '@angular/cdk/a11y';
import { HostBinding } from '@angular/core';

/** each selector that extends this class, has to implement an .active style */
export abstract class AbstractSelectorHighlightableComponent implements Highlightable {

	private _isActive = false;

	public abstract getLabel();

	constructor() { }

	@HostBinding('class.active') get isActive() {
		return this._isActive;
	}

	setActiveStyles() {
		this._isActive = true;
	}

	setInactiveStyles() {
		this._isActive = false;
	}
}
