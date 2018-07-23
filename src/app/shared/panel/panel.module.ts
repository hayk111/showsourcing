import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '~shared/panel/component/side-panel/side-panel.component';
import { DividerModule } from '~shared/divider/divider.module';
import { SidePanelTitleComponent } from '~shared/panel/component/side-panel/side-panel-title.component';
import { SidePanelActionComponent } from '~shared/panel/component/side-panel/side-panel-action.component';

@NgModule({
	imports: [
		CommonModule,
		DividerModule
	],
	declarations: [
		SidePanelComponent,
		SidePanelTitleComponent,
		SidePanelActionComponent
	],
	exports: [
		SidePanelComponent,
		SidePanelTitleComponent,
		SidePanelActionComponent
	]
})
export class PanelModule { }
