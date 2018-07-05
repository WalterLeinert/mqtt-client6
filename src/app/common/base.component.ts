import { EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export abstract class BaseComponent implements OnInit {
  private _on;
  public text = '';
  public style;

  @Output()
  public onChange: EventEmitter<boolean> = new EventEmitter<boolean>();;

  constructor(private sanitizer: DomSanitizer) {
    this.on = false;
  }

  ngOnInit() {
    this.updateProperties();
  }

  @Input()
  public get on(): boolean {
    return this._on;
  }

  public set on(value: boolean) {
    if (this._on !== value) {
      this._on = value;
      this.onOnChange(value);
    }
  }


  protected toggle() {
    this.on = !this.on;
    this.updateProperties();
  }

  private updateProperties() {
    this.text = this.on ? 'On' : 'Off';
    let style = 'background-color: ';
    style += this.on ? 'lightgreen' : 'lightcoral';
    this.style = this.sanitizer.bypassSecurityTrustStyle(style);
  }

  protected onOnChange(value: boolean) {
    this.onChange.emit(value);
  }

}