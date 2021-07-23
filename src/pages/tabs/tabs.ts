import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BusinessProfilePage } from '../business-profile/business-profile';
import { ListViewPage } from '../list-view/list-view';
import { SearchPage } from '../search/search';
import { ListMasterPage } from '../list-master/list-master';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = 'ListMasterPage';
  tab2Root = 'SearchPage';
//  tab4Root = Notifications;
  tab5Root = 'BusinessProfilePage';


  constructor(public navCtrl: NavController, public translateService: TranslateService) {

  }
}
