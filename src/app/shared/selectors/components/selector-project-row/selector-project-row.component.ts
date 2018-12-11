import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/asbtract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-project-row-app',
	templateUrl: './selector-project-row.component.html',
	styleUrls: ['./selector-project-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorProjectRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() project: Project;

	constructor() { super(); }

	getLabel() {
		return this.project.id;
	}
}
