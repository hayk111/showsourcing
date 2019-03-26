import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestModule } from './request/request.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RequestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
