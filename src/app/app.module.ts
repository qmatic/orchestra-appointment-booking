import { SPService } from './../services/rest/sp.service';
import { appRoutes } from './../routes/app-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from '../i18n/translations-loader';
import { StoreModule } from '@ngrx/store';
import rootReducer from '../redux/reducers/root-reducer';
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
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
  }
}
