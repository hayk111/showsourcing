import { Component, OnInit } from '@angular/core';
import { AbstractInput } from '../../../form-builder/interfaces/abstract-input.class';
import { FormBuilderService } from '../../../form-builder/services/form-builder.service';

@Component({
  selector: 'select-app',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends AbstractInput implements OnInit {

  constructor(protected fbSrv: FormBuilderService) {
    super(fbSrv);
  }

  ngOnInit() {
  }

}
