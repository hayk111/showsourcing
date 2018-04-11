import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~app/app-root/utils';

import { DialogHostDirective } from '../../containers/dialog-host.directive';
import { dialogComponentMap } from '../../models/dialog-component-map.const';
import { DialogName } from '../../models/dialog-names.enum';
import { DialogActions } from '../../store/dialog.action';
import { selectDialogState } from '../../store/dialog.selector';
import { takeUntil } from 'rxjs/operators';


@Component({
	selector: 'dialog-container-app',
	templateUrl: './dialog-container.component.html',
	styleUrls: ['./dialog-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainerComponent extends AutoUnsub implements AfterViewInit {
	// host where we will put dynamically generated components
	@ViewChild(DialogHostDirective) host: DialogHostDirective;
	// view container of said host.
	protected viewContainerRef;
	// currently displayed dialog if any
	protected currentDialog: DialogName;
	isOpen = false;

	constructor(
		protected store: Store<any>,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected cdRef: ChangeDetectorRef) {
		super();
	}

	ngAfterViewInit() {
		this.viewContainerRef = this.host.viewContainerRef;
		this.store.select(selectDialogState)
			.pipe(takeUntil(this._destroy$))
			.subscribe(({ name, props }) => {
				// if the name is null it means it's a close action
				if (!name)
					this.clear();
				else
					this.open(name, props);
			});
	}

	/** will put a component in the host container */
	open(name: DialogName, props: any) {
		this.isOpen = true;
		this.currentDialog = name;
		const component = this.getComponent(name);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		this.viewContainerRef.clear();

		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		// adding properties to dialog
		if (props) {
			Object.keys(props).forEach(key => {
				(<any>componentRef.instance)[key] = props[key];
			});
		}

		// mark for cd since we use the store and the event happened somewhere else
		this.cdRef.markForCheck();
	}

	close() {
		this.store.dispatch(DialogActions.close(this.currentDialog));
	}

	/** removes component from host */
	clear() {
		if (this.isOpen) {
			this.viewContainerRef.clear();
			this.isOpen = false;
			this.cdRef.markForCheck();
		}
	}

	/** gets the component given a component name, throws error if not found */
	getComponent(name: DialogName) {
		const component = dialogComponentMap[name];

		if (!component)
			throw Error(`the component with name ${name} wasn't found in the dialog component map. Please put it there in order to make it work.`);

		return component;
	}

}
