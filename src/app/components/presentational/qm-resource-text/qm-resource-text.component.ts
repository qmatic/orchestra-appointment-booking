import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-resource-text',
  templateUrl: './qm-resource-text.component.html',
  styleUrls: ['./qm-resource-text.component.scss']
})
export class QmResourceTextComponent implements OnInit {

  private userDirection$: Observable<string>;

  @Input()
  text = '';

  constructor(
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }

}
