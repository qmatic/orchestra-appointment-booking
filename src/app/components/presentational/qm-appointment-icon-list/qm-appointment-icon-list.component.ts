import { Component, OnInit, Input } from '@angular/core';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-appointment-icon-list',
  templateUrl: './qm-appointment-icon-list.component.html',
  styleUrls: ['./qm-appointment-icon-list.component.scss']
})
export class QmAppointmentIconListComponent implements OnInit {
  @Input() appointment: IAppointment;
  @Input() userLocale: string;

  constructor() { }

  ngOnInit() {
  }
}
