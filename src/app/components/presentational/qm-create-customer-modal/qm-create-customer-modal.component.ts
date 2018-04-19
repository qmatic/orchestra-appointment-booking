import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerDispatchers } from '../../../../store';


@Component({
  selector: 'qm-create-customer-modal',
  templateUrl: './qm-create-customer-modal.component.html',
  styleUrls: ['./qm-create-customer-modal.component.scss']
})
export class QmCreateCustomerModalComponent implements OnInit {
  private createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private customerDispatchers: CustomerDispatchers
  ) {
    this.buildUserForm();
  }

  ngOnInit() {
  }

  buildUserForm() {
    this.createUserForm = this.fb.group({
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9\-\+\s\(\)\.]/)]]
    });
  }

  saveCustomer() {
    const customer: ICustomer = this.prepareSaveCustomer();
    this.customerDispatchers.createCustomer(customer);
  }

  prepareSaveCustomer(): ICustomer {
    const formModel = this.createUserForm.value;

    const customerToSave: ICustomer = {
      firstName: formModel.firstName as string,
      lastName: formModel.lastName as string,
      name: formModel.firstName as string + ' ' + formModel.lastName as string,
      email: formModel.email as string,
      phone: formModel.phone as string
    };

    return customerToSave;
  }

}
