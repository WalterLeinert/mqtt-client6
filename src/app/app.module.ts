import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwitchesModule } from './switches/switches.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SwitchesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
