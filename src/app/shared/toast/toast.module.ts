import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '~shared/icons/icons.module';

import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
	imports: [CommonModule, IconsModule, TranslateModule],
	declarations: [ToastComponent, ToastContainerComponent],
	exports: [ToastContainerComponent],
	providers: [],
})
export class ToastModule {

}
