import { Project } from '~projects/models/project.model';
import { ExtendedEntityState } from '~entity';
export * from './project.reducer';

// tslint:disable-next-line:no-empty-interface
export interface ProjectsState extends ExtendedEntityState<Project> {}
export interface EntitiesState {
	projects: ProjectsState;
}
