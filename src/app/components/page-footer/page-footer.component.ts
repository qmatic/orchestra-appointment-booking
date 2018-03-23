import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { SystemService } from '../../../services/rest/system.service';
import { IAppState, getSystemInformation } from '../../../store/reducers';
import { ISystemInformation } from '../../../models/system.model';
import { LoadSystemInformation } from '../../../store/actions/system.action';

@Component({
  selector: 'qm-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  systemInformation: Observable<ISystemInformation>;

  constructor(private store: Store<IAppState>) { 
    this.systemInformation = this.store.select(getSystemInformation)
  }

  ngOnInit() {
    
  }

}
