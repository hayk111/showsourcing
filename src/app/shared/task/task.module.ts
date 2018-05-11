import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '~app/shared/task/task.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: []
})
export class TaskModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: TaskModule,
			providers: [TaskService]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: TaskModule
		};
	}
}
