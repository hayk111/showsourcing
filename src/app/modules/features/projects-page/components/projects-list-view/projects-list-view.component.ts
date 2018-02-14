import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../../store/model/entities/project.model';

@Component({
  selector: 'projects-list-view-app',
  templateUrl: './projects-list-view.component.html',
  styleUrls: ['./projects-list-view.component.scss']
})
export class ProjectsListViewComponent implements OnInit {
	@Input() projects: Array<Project>;

  constructor() { }

  ngOnInit() {
  }

}
