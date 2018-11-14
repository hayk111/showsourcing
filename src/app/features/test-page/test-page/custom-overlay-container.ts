import { Injectable, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export class AppOverlayContainer extends OverlayContainer {

	_createContainer(): void {
		const container = document.createElement('div');
		container.classList.add('cdk-overlay-container');

		document.querySelector('#table-scroll-id').appendChild(container);
		this._containerElement = container;
	}
}
