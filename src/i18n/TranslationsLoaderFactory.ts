import { environment } from './../environments/environment';
import { TranslatePropsLoader } from './TranslatePropsLoader';
import { HttpClient } from '@angular/common/http';

const RESOURCE_PATH = './../bundle';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslatePropsLoader(http, RESOURCE_PATH, '.properties');
}
