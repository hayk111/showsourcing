import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsComponent, TabComponent]
})
export class TabsModule { }
