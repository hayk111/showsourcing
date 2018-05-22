import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormFieldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
