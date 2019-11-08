import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons/icons.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    DividerModule,
    IconsModule
  ],
  declarations: [NavComponent, NavItemComponent],
  exports: [NavComponent, NavItemComponent]
})
export class NavModule { }
