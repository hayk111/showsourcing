import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '~shared/panel/component/side-panel/side-panel.component';
import { DividerModule } from '~shared/divider/divider.module';
import { SidePanelTitleComponent } from '~shared/panel/component/side-panel/side-panel-title.component';
import { SidePanelActionComponent } from '~shared/panel/component/side-panel/side-panel-action.component';
import { DialogSidePanelComponent } from '~shared/panel/component/dialog-side-panel/dialog-side-panel.component';

@NgModule({
	imports: [
		CommonModule,
		DividerModule
	],
	declarations: [
		SidePanelComponent,
		SidePanelTitleComponent,
		SidePanelActionComponent,
		DialogSidePanelComponent
	],
	exports: [
		SidePanelComponent,
		SidePanelTitleComponent,
		SidePanelActionComponent,
		DialogSidePanelComponent
	]
})
export class PanelModule { }
