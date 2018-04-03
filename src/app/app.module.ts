import { FETCH_USER_INFO } from './../store/actions/user';
import { SPService } from './../services/rest/sp.service';
import { appRoutes } from './../routes/app-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';
import { StoreModule, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedComponentsModule } from '../components/shared-components.module';
import { EffectsModule } from '@ngrx/effects';
import effects from './../store/effects';
import rootReducer from '../store/reducers/root-reducer';
import { branchListReducer } from '../store/reducers/branch-list.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedComponentsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
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

  constructor(private translate: TranslateService, private store: Store<number>) {
    // No Suffix for english language file (staffBookingMessages.properties)
    this.translate.setDefaultLang('staffBookingMessages');
    
    this.store.dispatch({type: FETCH_USER_INFO});
  }
}
