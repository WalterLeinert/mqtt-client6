import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { State } from './state.enum';
import { Tuple } from './tuple';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  private static readonly stateMap = new Map<State, Tuple<string, string>>([
    [State.Undefined, new Tuple('?', 'yellow')],
    [State.On, new Tuple('On', 'lightgreen')],
    [State.Off, new Tuple('Off', 'lightcoral')]
  ]);


  private _state: State = State.Undefined;
  public buttonText = '';
  public buttonStyle;

  private _labelState: State = State.Undefined;
  public labelText = '';
  public labelStyle;


  @Output()
  public stateChange: EventEmitter<State> = new EventEmitter<State>();

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.updateProperties(this.state);
    this.updateLabelProperties(this.labelState);
  }

  //
  // property state
  //
  @Input()
  public get state(): State {
    return this._state;
  }

  public set state(value: State) {
    if (this._state !== value) {
      this._state = value;
      this.onStateChange(value);
    }
  }

  protected onStateChange(value: State) {
    this.updateProperties(value);
    this.stateChange.emit(value);
  }



  @Input()
  public get labelState(): State {
    return this._labelState;
  }

  public set labelState(value: State) {
    if (this._labelState !== value) {
      this._labelState = value;
      this.onLabelStateChange(value);
    }
  }

  protected onLabelStateChange(value: State) {
    this.updateLabelProperties(value);
  }




  protected toggle() {
    switch (this.state) {
      case State.Undefined:
      case State.Off:
        this.state = State.On;
        break;

      case State.On:
        this.state = State.Off;
        break;

      default:
        throw new Error(`invalide state: ${this.state}`);
    }
  }

  private updateProperties(state: State) {
    const tuple = DeviceComponent.stateMap.get(state);

    this.buttonText = tuple.v1;
    const style = 'background-color: ' + tuple.v2;
    this.buttonStyle = this.sanitizer.bypassSecurityTrustStyle(style);

    console.log(`updateProperties: state = ${state}, buttonStyle = ${this.buttonStyle}`);
  }

  private updateLabelProperties(state: State) {
    const tuple = DeviceComponent.stateMap.get(state);

    this.labelText = tuple.v1;
    const style = 'background-color: ' + tuple.v2;
    this.labelStyle = this.sanitizer.bypassSecurityTrustStyle(style);
    console.log(`updateLabelProperties: state = ${state}, labelStyle = ${this.labelStyle}`);
  }


  public onClick() {
    this.toggle();
  }

}
