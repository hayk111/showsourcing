import { NgModule } from '@angular/core';
import { GroupByPipe } from '~app/app-root/pipes/groupby';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.
@NgModule({
	declarations: [GroupByPipe],
	exports: [GroupByPipe],
})
export class PipesModule {}
