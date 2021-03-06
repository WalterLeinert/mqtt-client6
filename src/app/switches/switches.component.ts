import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'paho-mqtt';

import { Subscription } from 'rxjs';

import * as util from 'util';


import {
  MqttService,
  IMqttMessage
} from 'ngx-mqtt';

import { State } from '../device/state.enum';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit, OnDestroy {
  public static readonly subscriptionTemplate = 'mywebio/%s/status';
  public static readonly subscription = SwitchesComponent.createSubscription(SwitchesComponent.subscriptionTemplate, '+');

  public device0State = State.Undefined;
  public device1State = State.Undefined;

  public device0LabelState = State.Undefined;
  public device1LabelState = State.Undefined;


  private subscription: Subscription;
  public message: string;

  constructor(private mqttService: MqttService) {
    this.subscription = this.mqttService.observe(SwitchesComponent.subscription).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(`SwitchesComponent.ctor: message = ${this.message}, topic = ${message.topic}`);

      const parts = message.topic.split('/');
      if (parts.length === 3) {
        const stateValue = Number.parseInt(this.message);

        if (!isNaN(stateValue)) {
          const device = Number.parseInt(parts[1]);

          switch (device) {
            case 0:
              this.device0LabelState = stateValue as State;
              break;

            case 1:
              this.device1LabelState = stateValue as State;
              break;
          }
        }

      }
    });
  }

  public static createSubscription(template: string, param: string): string {
    return util.format(SwitchesComponent.subscriptionTemplate, param);
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public onState0Changed(state: State) {
    console.log(`onState0Changed: state = ${state}`);
    this.handleState(0, state);
  }

  public onState1Changed(state: State) {
    console.log(`onState1Changed: state = ${state}`);
    this.handleState(1, state);
  }

  public onPublishMessage() {
    this.mqttService.unsafePublish(SwitchesComponent.createSubscription(
      SwitchesComponent.subscriptionTemplate, '0'), `message-${new Date().getUTCMilliseconds()}`, { qos: 1, retain: true });
  }

  private handleState(device: number, state: State) {
    switch (state) {
      case State.On:
      case State.Off:
        this.publish(device, state);
        break;

      default:
        throw new Error(`invalide state: ${state}`);
    }
  }


  private publish(device: number, state: State) {
    console.log(`SwitchesComponent.publish: device = ${device}, state = ${state}`);
    this.mqttService.unsafePublish(SwitchesComponent.createSubscription(
      SwitchesComponent.subscriptionTemplate, device.toString()), state.toString(), { qos: 1, retain: true });
  }

}
