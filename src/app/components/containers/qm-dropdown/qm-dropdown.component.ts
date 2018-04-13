import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qm-dropdown',
  templateUrl: './qm-dropdown.component.html',
  styleUrls: ['./qm-dropdown.component.scss']
})
export class QmDropdownComponent implements OnInit {
  @Input() text: string;
  @Input() userDirection: string;
  private isExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown () {
    this.isExpanded = !this.isExpanded;
  }
}
