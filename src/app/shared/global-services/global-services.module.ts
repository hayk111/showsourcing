import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '~features/user';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [UserService]
})
export class GlobalServicesModule { }
