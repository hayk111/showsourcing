import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../../shared/form-builder/services/form-builder.service';
import { ProductLoadersService } from '../../products-page/services/product-loaders.service';
import { selectProp } from '../../../store/selectors/panel.selector';
import { Store } from '@ngrx/store';
import { Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../store/model/filter.model';
import { selectFilterGroup } from '../../../store/selectors/filter.selectors';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	@Input() filterGroupName: FilterGroupName = FilterGroupName.PRODUCT_PAGE;
	filters$: Observable<Array<Filter>>;
	listToOpen: string;
	isListOpen = false;

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	openList(item: string) {
		this.listToOpen = item;
		this.isListOpen = true;
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
