import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter, FilterGroup, FilterGroupName } from '../../../store/model/filter.model';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { selectFilterCategory, selectFilterGroup, selectFiltersAsUrlParams } from '../../../store/selectors/filter.selectors';
import { UrlBuilder } from '../../../../utils/url-builder.class';
import { TeamItemLoaderService } from '../../../shared/filtered-list-page/services/team-item-loader.service';

@Injectable()
export class ProductLoadersService {
	products$;

	constructor(private teamItemLoader: TeamItemLoaderService) {
		this.products$ = this.teamItemLoader.items$;
		this.teamItemLoader.init('products');
	}

}
