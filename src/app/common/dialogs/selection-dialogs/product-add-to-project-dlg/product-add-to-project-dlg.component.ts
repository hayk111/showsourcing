import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductDialogService } from '~common/dialogs/services/product-dialog.service';
import { ListPageService } from '~core/list-page';
import { ProjectService } from '~entity-services';
import { DEFAULT_TAKE_PAGINATION } from '~entity-services/_global/select-params';
import { EntityTypeEnum, ERM, Product, Project } from '~models';
import { CloseEventType } from '~shared/dialog';
import { DialogService } from '~shared/dialog/services';
import { FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-add-to-project-dlg-app',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService]
})
export class ProductAddToProjectDlgComponent extends AutoUnsub implements OnInit {

	@Input() initialSelectedProjects: Project[];
	@Input() products: Product[];

	selected = {};
	filterType = FilterType;
	erm = ERM;
	entityTypeEnum = EntityTypeEnum;

	private projectCount = DEFAULT_TAKE_PAGINATION;
	selectedProjectsCount = 0;

	constructor(
		private dlgSrv: DialogService,
		private productDlgSrv: ProductDialogService,
		private notifSrv: NotificationService,
		private translate: TranslateService,
		private projectSrv: ProjectService,
		public listSrv: ListPageService<Project, ProjectService>,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.projectSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: true, take: this.projectCount, query: 'deleted == false' },
			initialFilters: [{ type: FilterType.DELETED, value: false }], // TODO: add archived filter when backend property is added
			entityMetadata: ERM.PROJECT,
			originComponentDestroy$: this._destroy$
		});

		this.initialSelection();
	}

	select(project: Project) {
		this.selected[project.id] = project;
		this.listSrv.selectOne(project, true);
		++this.selectedProjectsCount;
	}

	unselect(project: Project) {
		delete this.selected[project.id];
		this.listSrv.unselectOne(project, true);
		--this.selectedProjectsCount;
	}

	private initialSelection() {
		if (this.initialSelectedProjects && this.initialSelectedProjects.length > 0) {
			this.selectedProjectsCount = this.initialSelectedProjects.length;

			this.listSrv.selectAll(this.initialSelectedProjects.map(project => {
				this.selected[project.id] = project;

				return ({ id: project.id });
			}));
		}
	}

	selectAll(projects: Project[]) {
		this.listSrv.selectAll(projects, true);

		projects.forEach(project => {
			this.selected[project.id] = project;
			delete this.unselect[project.id];
		});

		this.selectedProjectsCount = projects.length;
	}

	unselectAll() {
		this.listSrv.unselectAll();
		this.selected = {};
		this.selectedProjectsCount = 0;
	}

	create() {
		setTimeout(() => {
			this.listSrv.create(false, {
				onProjectCreated: (project: Project) => {
					this.selected[project.id] = {...project};
					const selectedProjects = <Project[]>Object.values(this.selected);
					this.productDlgSrv.addProjectsToProducts(selectedProjects, this.products).subscribe();
				}
			});
		});
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	submit() {
		// we add each project one by one to the store
		const selectedProjects = <Project[]>Object.values(this.selected);
		this.dlgSrv.close({ type: CloseEventType.OK, data: { selectedProjects, products: this.products } });

		const addedProjects = selectedProjects.filter(project => {
			return !this.initialSelectedProjects.find(elem => elem.id === project.id);
		});

		this.productDlgSrv.addProjectsToProducts(addedProjects, this.products)
			.subscribe(projects => {
				this.dlgSrv.close();
				this.initialSelectedProjects = [...this.initialSelectedProjects, ...addedProjects];
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: this.translate.instant('title.projects-added'),
					message: this.translate.instant('message.your-projects-added-success'),
					timeout: 3500
				});
			});
	}

}
