import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qm-list',
  templateUrl: './qm-list.component.html',
  styleUrls: ['./qm-list.component.scss']
})
export class QmListComponent implements OnInit {

  constructor() { }

  @Input()
  header: string;

  ngOnInit() {
  }
}
