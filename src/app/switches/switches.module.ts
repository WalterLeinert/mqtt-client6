import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

import { MqttConnector } from './mqtt-connector';
import { SwitchesComponent } from './switches.component';
import { DeviceComponent } from '../device/device.component';

// TODO: configure from outside
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'm11.cloudmqtt.com',
  port: 38887,
  path: '',
  username: 'rvwjwmyn',
  password: '5j6dW311f3n1',
  protocol: 'wss'
};

@NgModule({
  declarations: [
    SwitchesComponent,
    DeviceComponent
  ],
  exports: [
    SwitchesComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [MqttConnector]
})
export class SwitchesModule { }
