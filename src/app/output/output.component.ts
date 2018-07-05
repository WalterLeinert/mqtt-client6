import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent extends BaseComponent implements OnInit {



  constructor(sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  public onClick() {
    this.toggle();
  }

}