import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestPageComponent } from './request-page/request-page.component';

@NgModule({
  declarations: [RequestPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'request', component: RequestPageComponent }
    ])
  ]
})
export class RequestModule { }
