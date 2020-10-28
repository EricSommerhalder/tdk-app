import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AppInitService,
  DspApiConfigToken,
  DspApiConnectionToken,
  DspActionModule,
  DspCoreModule,
  DspSearchModule,
  DspViewerModule
} from '@dasch-swiss/dsp-ui';
import {environment} from '../environments/environment';
import {KnoraApiConnection} from '@dasch-swiss/dsp-js';
import { PlaygroundComponent } from './playground/playground.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DspCoreModule,
    DspViewerModule,
    DspSearchModule,
    DspActionModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER, // see https://angular.io/api/core/APP_INITIALIZER
      useFactory: (appInitService: AppInitService) =>
        (): Promise<any> => {
          return appInitService.Init('config', environment);
        },
      deps: [AppInitService], // depends on AppInitService
      multi: true
    },
    {
      provide: DspApiConfigToken,
      useFactory: (appInitService: AppInitService) => appInitService.dspApiConfig, // AppInitService is passed to the factory method
      deps: [AppInitService] // depends on AppInitService
    },
    {
      provide: DspApiConnectionToken,
      useFactory: (appInitService: AppInitService) => new KnoraApiConnection(appInitService.dspApiConfig), // AppInitService is passed to the factory method
      deps: [AppInitService] // depends on AppInitService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
