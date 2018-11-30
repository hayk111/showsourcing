import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AppComponent } from '~app-root/components/app.component';
import { routes } from '~app-root/routes';
import { EventModule } from '~features/event/event.module';
import { InvitationModule } from '~features/invitation';
import { AppApolloModule } from '~core/apollo/apollo.module';
import { CardModule } from '~shared/card';
import { DialogModule } from '~shared/dialog';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~core/local-storage';
import { NotificationsModule } from '~shared/notifications';
import { PortalModule } from '~core/portal';
import { TemplateModule } from '~core/template';
import { SharedModule } from '~shared/shared.module';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		AppApolloModule,
		TemplateModule,
		// keep router as last module
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			enableTracing: true
		}),
		PortalModule
	],
	exports: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppRootModule { }
