import { QmListItemComponent } from './../components/qm-list-item/qm-list-item.component';
import { QmListComponent } from './../components/qm-list/qm-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [QmListComponent, QmListItemComponent],
  exports: [QmListComponent, QmListItemComponent]
})
export class SharedComponentsModule { }
