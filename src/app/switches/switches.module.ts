import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MqttConnector } from './mqtt-connector';
import { SwitchesComponent } from './switches.component';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';

@NgModule({
  declarations: [
    SwitchesComponent,
    InputComponent,
    OutputComponent
  ],
  exports: [
    SwitchesComponent,
    InputComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ MqttConnector ]
})
export class SwitchesModule { }
