import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBarComponent } from '~shared/selection-bar/components/selection-bar/selection-bar.component';
import { IconsModule } from '~shared/icons/icons.module';
import { BottomPanelModule } from '~shared/bottom-panel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, IconsModule, BottomPanelModule, TranslateModule],
	declarations: [SelectionBarComponent],
	exports: [SelectionBarComponent],
})
export class SelectionBarModule { }
