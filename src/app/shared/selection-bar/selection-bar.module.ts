import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBarComponent } from '~shared/selection-bar/components/selection-bar/selection-bar.component';
import { IconsModule } from '~shared/icons/icons.module';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [SelectionBarComponent],
	exports: [SelectionBarComponent],
})
export class SelectionBarModule {}
