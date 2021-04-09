import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qm-appointment-list-dashboard',
  templateUrl: './qm-appointment-list-dashboard.component.html',
  styleUrls: ['./qm-appointment-list-dashboard.component.scss']
})
export class QmAppointmentListDashboardComponent implements OnInit {
  public branchName: string;
  constructor() { }

  ngOnInit(): void {
  }

  branchNameEmitted(event) {
    this.branchName = event;
  }

}
