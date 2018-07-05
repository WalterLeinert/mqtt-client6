// tslint:disable:no-console

import { Injectable, EventEmitter } from '@angular/core';

import { Client, Message } from 'paho-mqtt';

/*
 * MQTT-WebClient example for Web-IO 4.0
*/


@Injectable()
export class MqttConnector {
    public static readonly hostname = 'm21.cloudmqtt.com';
    public static readonly port = 37719;
    public static readonly clientId = 'webio4mqttexample' + new Date().getUTCMilliseconds();
    public static readonly username = 'webclient';
    public static readonly password = 'Super$icher123';
    public static readonly subscription = 'mywebio/+/status';

    private mqttClient: Client;
    public MessageArrived: EventEmitter<Message> = new EventEmitter<Message>();


    constructor() {
        this.mqttClient = new Client(MqttConnector.hostname, MqttConnector.port, MqttConnector.clientId);
        this.mqttClient.onConnectionLost = this.onConnectionLost;
        this.mqttClient.onMessageArrived = this.onMessageArrived;

        this.connect();
    }

    public send(message: Message) {
        this.mqttClient.send(message);
    }

    /* Initiates a connection to the MQTT broker */
    private connect() {
        this.mqttClient.connect({
            onFailure: this.onConnectionFailed,
            onSuccess: this.onConnected,
            keepAliveInterval: 10,
            userName: MqttConnector.username,
            useSSL: true,
            password: MqttConnector.password
        });
    }

    /*Callback for successful MQTT connection */
    private onConnected() {
        console.log('OnConnected');
        this.mqttClient.subscribe(MqttConnector.subscription);
    }

    /*Callback for failed connection*/
    private onConnectionFailed(res) {
        console.log('Connect failed:' + res.errorMessage);
    }

    /*Callback for lost connection*/
    private onConnectionLost(res) {
        if (res.errorCode !== 0) {
            console.log('Connection lost:' + res.errorMessage);
            this.connect();
        }
    }

    private onMessageArrived(message: Message) {
        this.MessageArrived.emit(message);
    }
}