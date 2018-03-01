import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'projects-list-view-app',
  templateUrl: './projects-list-view.component.html',
  styleUrls: ['./projects-list-view.component.scss']
})
export class ProjectsListViewComponent implements OnInit {
	@Output() projectSelect = new EventEmitter<string>();
	@Output() projectUnselect = new EventEmitter<string>();
	@Input() projects: Array<Project> = [];
	@Input() selection: Map<string, boolean>;

  constructor() { }

  ngOnInit() {
	}

	onSelect(event, id) {
		if (event.target.checked)
			this.projectSelect.emit(id);
		else
			this.projectUnselect.emit(id);
		event.stopPropagation();
	}

}
