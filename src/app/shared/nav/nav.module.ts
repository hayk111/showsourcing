import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DividerModule } from '~shared/divider/divider.module';
import { IconsModule } from '~shared/icons/icons.module';
import { NavComponent } from '~shared/nav/components/nav/nav.component';
import { NavItemComponent } from '~shared/nav/components/nav-item/nav-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DividerModule,
    IconsModule
  ],
  declarations: [NavComponent, NavItemComponent],
  exports: [NavComponent, NavItemComponent]
})
export class NavModule { }
