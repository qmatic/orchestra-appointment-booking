import { QmListItemComponent } from './../components/qm-list-item/qm-list-item.component';
import { QmListComponent } from './../components/qm-list/qm-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QmListComponent, QmListItemComponent],
  exports: [QmListComponent, QmListItemComponent]
})
export class SharedComponentsModule { }
