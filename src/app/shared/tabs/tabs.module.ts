import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '~shared/tabs/components/tabs/tabs.component';
import { TabComponent } from '~shared/tabs/components/tab/tab.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [TabsComponent, TabComponent],
	exports: [TabsComponent, TabComponent]
})
export class TabsModule { }
