import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[columnApp]'
})
export class ColumnDirective {
	@Input('columnApp') title: string;

	constructor(public template: TemplateRef<any>) { }

	ngOnInit() {
	}

}
