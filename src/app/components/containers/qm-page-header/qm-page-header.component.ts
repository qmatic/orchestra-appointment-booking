import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors } from '../../../../store';


@Component({
  selector: 'qm-page-header',
  templateUrl: './qm-page-header.component.html',
  styleUrls: ['./qm-page-header.component.scss']
})
export class QmPageHeaderComponent implements OnInit {
  brandLogoSrc = 'assets/images/brand_logo_header.png';
  userFullName$: Observable<string>;
  userIsAdmin$: Observable<boolean>;

  constructor(
    private userSelectors: UserSelectors
  ) {
    this.userIsAdmin$ = this.userSelectors.userIsAdmin$;
    this.userFullName$ = this.userSelectors.userFullName$;
  }

  ngOnInit() { }

}
