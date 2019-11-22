import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBarComponent } from '~shared/selection-bar/components/selection-bar/selection-bar.component';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { IconsModule } from '~shared/icons/icons.module';
import { ERMModule } from '~shared/erm/erm.module';
import { BottomPanelModule } from '~shared/bottom-panel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, IconsModule, BottomPanelModule, TranslateModule, ERMModule, InputsCustomModule],
	declarations: [SelectionBarComponent],
	exports: [SelectionBarComponent],
})
export class SelectionBarModule { }
