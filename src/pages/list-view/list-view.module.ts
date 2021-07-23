import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListViewPage } from './list-view';

@NgModule({
  declarations: [
    ListViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListViewPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListViewPage
  ]
})
export class ListViewPageModule { }
