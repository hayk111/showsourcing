import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBarComponent } from '~shared/selection-bar/components/selection-bar/selection-bar.component';
import { IconsModule } from '~shared/icons/icons.module';
import { BottomPanelModule } from '~shared/bottom-panel';

@NgModule({
	imports: [CommonModule, IconsModule, BottomPanelModule],
	declarations: [SelectionBarComponent],
	exports: [SelectionBarComponent],
})
export class SelectionBarModule { }
