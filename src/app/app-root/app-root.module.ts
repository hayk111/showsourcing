import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AppComponent } from '~app-root/components/app.component';
import { routes } from '~app-root/routes';
import { AuthModule } from '~features/auth';
import { EventModule } from '~features/event/event.module';
import { InvitationModule } from '~features/invitation';
import { PickATeamModule } from '~features/pick-a-team/pick-a-team.module';
import { TestPageModule } from '~features/test-page/test-page.module';
import { UserModule } from '~features/user';
import { AppApolloModule } from '~shared/apollo/apollo.module';
import { CardModule } from '~shared/card';
import { DialogModule } from '~shared/dialog';
import { IconsModule } from '~shared/icons';
import { LocalStorageModule } from '~shared/local-storage';
import { NotificationsModule } from '~shared/notifications';
import { PortalModule } from '~shared/portal';
import { TemplateModule } from '~shared/template';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppOverlayContainer } from '~features/test-page/test-page/custom-overlay-container';

// Can a kangaroo jump higher than a house ?
// Of course, a house doesn’t jump at all.

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppApolloModule,
		BrowserModule,
		BrowserAnimationsModule,
		AuthModule,
		InvitationModule,
		HttpClientModule,
		TemplateModule,
		LocalStorageModule,
		UserModule,
		TemplateModule,
		EventModule,
		IconsModule, // used to create symboles at the top
		CardModule,
		// shared
		NotificationsModule,
		DialogModule,
		// modules features
		PickATeamModule,
		TestPageModule,
		// keep router as last module
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top',
			// enableTracing: true
		}),
		PortalModule
	],
	providers: [{ provide: OverlayContainer, useFactory: () => new AppOverlayContainer(document) }],
	exports: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppRootModule { }
