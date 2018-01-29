import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
	imports: [
		CommonModule,
		AppStoreModule.forChild()
	],
	providers: [UserService]
})
export class UserModule { }
