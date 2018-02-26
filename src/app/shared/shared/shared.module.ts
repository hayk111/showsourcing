import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';

@NgModule({
  imports: [
		CommonModule,
		HttpClientModule,
		IconsModule,
		LoadersModule
  ],
  declarations: []
})
export class SharedModule { }
