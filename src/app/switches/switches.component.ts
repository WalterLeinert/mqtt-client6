import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'paho-mqtt';

import { Subscription } from 'rxjs';


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
  public static readonly subscription = 'mywebio/status';

  public device0State = State.Undefined;
  public device1State = State.Undefined;

  public device0LabelState = State.Undefined;
  public device1LabelState = State.Undefined;


  private subscription: Subscription;
  public message: string;

  constructor(private mqttService: MqttService) {
    // this.mqttConnectorService.MessageArrived.subscribe((message: Message) => {
    //   // tslint:disable-next-line:no-console
    //   console.log(message.destinationName + ' : ' + message.payloadString);
    //   let displayClass = 'unknown';

    //   switch (message.payloadString) {
    //     case 'ON':
    //       displayClass = 'on';
    //       break;
    //     case 'OFF':
    //       displayClass = 'off';
    //       break;
    //     default:
    //       displayClass = 'unknown';
    //   }
    //   const topic = message.destinationName.split('/');
    //   if (topic.length === 3) {
    //     const ioname = topic[1];
    //     // TODO: this.UpdateElement(ioname, displayClass);
    //   }
    // });

    this.subscription = this.mqttService.observe(SwitchesComponent.subscription).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(`SwitchesComponent.ctor: message = ${this.message}`);
    });
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
    this.mqttService.unsafePublish(SwitchesComponent.subscription, `message-${new Date().getUTCMilliseconds()}`, { qos: 1, retain: true });
  }

  private handleState(device: number, state: State) {
    switch (state) {
      case State.On:
      case State.Off:
        this.publish(0, state);
        break;

      default:
        throw new Error(`invalide state: ${state}`);
    }
  }


  private publish(device: number, state: State) {
    this.mqttService.unsafePublish(SwitchesComponent.subscription, state.toString(), { qos: 1, retain: true });
  }

}
