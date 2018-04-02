import { SPService } from './../services/rest/sp.service';
import { appRoutes } from './../routes/app-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';
import { StoreModule } from '@ngrx/store';
import rootReducer from '../redux/reducers/root-reducer';
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedComponentsModule,
    StoreModule.forRoot(
      rootReducer
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [SPService, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private translate: TranslateService) {
    // No Suffix for english language file (staffBookingMessages.properties)
    this.translate.setDefaultLang('staffBookingMessages');
    
    // Set user language
    this.translate.use('staffBookingMessages');
  }
}
