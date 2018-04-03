import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDialogState } from '~app/shared/dialog/store/dialog.selector';
import { AutoUnsub } from '~app/app-root/utils';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { DialogHostDirective } from '~app/shared/dialog/containers/dialog-host.directive';
import { dialogComponentMap } from '~app/shared/dialog/models/dialog-component-map.const';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';


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
	isOpen: boolean;

	constructor(protected store: Store<any>, protected componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	ngAfterViewInit() {
		// this.viewContainerRef = this.host.viewContainerRef;
		this.store.select(selectDialogState)
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
		this.currentDialog = name;
		const component = this.getComponent(name);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		const viewContainerRef = this.host.viewContainerRef;
		this.viewContainerRef.clear();

		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		(<any>componentRef.instance).props = props;
		this.isOpen = true;
	}

	close() {
		this.store.dispatch(DialogActions.close(this.currentDialog));
	}

	/** removes component from host */
	clear() {
		if (this.isOpen) {
			this.viewContainerRef.clear();
			this.isOpen = false;
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
