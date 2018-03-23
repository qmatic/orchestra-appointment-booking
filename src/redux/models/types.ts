import { Observable } from 'rxjs/Observable';
import { IAppState } from './../../models/IAppState';

// Type used to define what you want to get out of store
export type SelectLamda = <T>(l:IAppState)=>T;