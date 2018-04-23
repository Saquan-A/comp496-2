import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BusinessProfilePage } from './business-profile';

@NgModule({
  declarations: [
    BusinessProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessProfilePage),
    TranslateModule.forChild()
  ],
  exports: [
    BusinessProfilePage
  ]
})
export class BusinessProfilePageModule { }
