import { Component, OnInit } from '@angular/core';
import { Message } from 'paho-mqtt';

import { MqttConnector } from './mqtt-connector';


@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {
  public input0On = false;
  public output0On = true;
  public input1On = false;
  public output1On = true;

  constructor(private mqttConnector: MqttConnector) {
    this.mqttConnector.MessageArrived.subscribe((message: Message) => {
      // tslint:disable-next-line:no-console
      console.log(message.destinationName + ' : ' + message.payloadString);
      let displayClass = 'unknown';

      switch (message.payloadString) {
        case 'ON':
          displayClass = 'on';
          break;
        case 'OFF':
          displayClass = 'off';
          break;
        default:
          displayClass = 'unknown';
      }
      const topic = message.destinationName.split('/');
      if (topic.length === 3) {
        const ioname = topic[1];
        // TODO: this.UpdateElement(ioname, displayClass);
      }
    });
  }


  /*
   * Toggles an input in the web interfaces and
   * initiates an MQTT publish
   */
  private ToggleOutput(ioname: string) {
    const cell = document.getElementById(ioname);
    let message: Message;
    switch (cell.className) {
      case 'on':
        message = new Message('OFF');
        message.destinationName = 'mywebio/' + ioname + '/set';
        this.mqttConnector.send(message);
        cell.className = 'set_off';
        break;
      case 'off':
        message = new Paho.MQTT.Message('ON');
        message.destinationName = 'mywebio/' + ioname + '/set';
        this.mqttConnector.send(message);
        cell.className = 'set_on';
        break;
      default:
        cell.className = 'unknown';
        break;
    }

  }

  ngOnInit() {

  }


  public onInput0Clicked() {
    console.log('onInput0Clicked');
  }

  public onInput1Clicked() {
    console.log('onInput1Clicked');
  }

  public onOutput0Clicked() {
    console.log('onOutput0Clicked');
  }

  public onOutput1Clicked() {
    console.log('onOutput1Clicked');
  }

}
