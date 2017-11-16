import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../../shared/form-builder/services/form-builder.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  descriptor = DESCRIPTOR;
  formGroup = new FormGroup({});

  constructor() { 
  }

  ngOnInit() {
  }

  onControlCreated(ctrl: FormGroup){
  }

}

const DESCRIPTOR = {
  groups:[
    {
      name: 'general',
      fields:[
        { name: 'name',
          value: 'cedric', 
          required: true
        }
      ]
    },
    {
      name: 'second',
      fields:[
        { name: 'emailt', type: 'email' }
        
      ]
    }
  ]
};
