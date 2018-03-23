import { AppComponent } from './../app/app.component';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [  
    { path: '**', component: AppComponent }
  ];