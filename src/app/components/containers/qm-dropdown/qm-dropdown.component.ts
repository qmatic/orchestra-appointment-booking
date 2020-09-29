import { Component, OnInit, Input } from '@angular/core';
import { UserSelectors } from '../../../../store/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'qm-dropdown',
  templateUrl: './qm-dropdown.component.html',
  styleUrls: ['./qm-dropdown.component.scss']
})
export class QmDropdownComponent implements OnInit {
  @Input() text: string;
  @Input() userDirection: string;
  @Input() isExpanded = false;
  @Input() maxHeight: string;

  public userDirection$: Observable<string>;

  constructor(private userSelectors: UserSelectors) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isExpanded = !this.isExpanded;
  }
}
