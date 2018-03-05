import { Project } from '~projects/models/project.model';
import { EntityState } from '~entity';
export * from './project.reducer';

// tslint:disable-next-line:no-empty-interface
export interface ProjectsState extends EntityState<Project> {}
export interface EntitiesState {
	projects: ProjectsState;
}
