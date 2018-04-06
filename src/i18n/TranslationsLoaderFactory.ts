import { environment } from './../environments/environment';
import { TranslatePropsLoader } from './TranslatePropsLoader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslatePropsLoader(http, environment.propertiesUrl, '.properties');
}
