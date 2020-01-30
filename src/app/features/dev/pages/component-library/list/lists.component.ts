import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { productsJson } from './mock-data';
import { Sample, Task, Project } from '~core/erm/models';

@Component({
	selector: 'list-app',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
	products = JSON.parse(productsJson);

	projects: Array<Project>;
	tasks: Array<Task>;
	samples: Array<Sample>;

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit() {
		this.tasks = this.products[0].tasksLinked.items;
		this.samples = this.products[0].samplesLinked.items;
		this.projects = this.products[0].projects;
	}
}
