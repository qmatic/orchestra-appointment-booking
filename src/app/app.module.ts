import { FETCH_USER_INFO } from './../redux/actions/user';
import {HttpModule} from '@angular/http';
import { SPService } from './../services/rest/sp.service';
import { appRoutes } from './../routes/app-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';
import { StoreModule, Store } from "@ngrx/store";
import rootReducer from '../redux/reducers/root-reducer';
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from "../redux/effects/user";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    SharedComponentsModule,
    StoreModule.forRoot(
      rootReducer
    ),
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(
      rootReducer
    ),
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
