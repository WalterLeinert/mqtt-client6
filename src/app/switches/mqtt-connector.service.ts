import { Injectable } from '@angular/core';
import { Client, Message, WithInvocationContext } from 'paho-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttConnectorService {
  public static readonly hostname = 'm11.cloudmqtt.com';
  public static readonly port = 38887;
  public static readonly clientId = 'webio4mqttexample' + new Date().getUTCMilliseconds();
  public static readonly username = 'rvwjwmyn';
  public static readonly password = '5j6dW311f3n1';
  public static readonly subscription = 'World';

  private client: Client;

  constructor() {
    this.client = new Client(
      MqttConnectorService.hostname,
      MqttConnectorService.port,
      '',
      MqttConnectorService.clientId
    );

    // set callback handlers
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;

    console.log('MqttConnectorService.ctor: connecting to mqtt ...');

    // connect the client
    this.client.connect({
      timeout: 10,
      onSuccess: onConnect,
      onFailure: this.onConnectionFailed,
      keepAliveInterval: 10,
      userName: MqttConnectorService.username,
      useSSL: true,
      password: MqttConnectorService.password,
      invocationContext: this.client
    });
  }

  public send(text: string) {
    const message = new Message(text);
    message.destinationName = '';
    this.client.send(message);
  }

  /* Callback for failed connection */
  private onConnectionFailed(res) {
    console.log('Connect failed:' + res.errorMessage);
  }

}

// called when the client connects
function onConnect(context: WithInvocationContext) {
  // Once a connection has been made, make a subscription and send a message.
  console.log('onConnect');
  const client = context.invocationContext as Client;
  client.subscribe(MqttConnectorService.subscription);

  const message = new Message('OFF');
  message.destinationName = '';
  client.send(message);
}


// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log('onMessageArrived:' + message.payloadString);
}
