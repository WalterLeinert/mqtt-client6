import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends BaseComponent  implements OnInit {

  constructor(sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  public onClick() {
    this.toggle();
  }
}
