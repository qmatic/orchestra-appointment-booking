import { QmListSelectItemComponent } from './qm-select-item/qm-select-item.component';
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
  declarations: [QmListComponent, QmListItemComponent, QmListSelectItemComponent],
  exports: [QmListComponent, QmListItemComponent, QmListSelectItemComponent]
})
export class SharedComponentsModule { }
