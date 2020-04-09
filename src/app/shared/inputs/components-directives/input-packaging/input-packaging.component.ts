import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Packaging } from '~core/erm3/models';
import { AbstractInput, makeAccessorProvider } from '../abstract-input.class';

@Component({
	selector: 'input-packaging-app',
	templateUrl: './input-packaging.component.html',
	styleUrls: ['./input-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPackagingComponent)]
})
export class InputPackagingComponent extends AbstractInput {
	@Input() value: Packaging = {};
}
