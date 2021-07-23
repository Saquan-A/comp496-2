import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Users } from '../../models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Profile} from '../../models/profile'
import { Listing } from '../../models/listing'
import { storage, initializeApp } from 'firebase';
import { ListMasterPage } from '../list-master/list-master';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html'
})

export class ListViewPage {
  public myPerson = {};

  users = {} as Users;
  profile = {} as Profile;
  listing = {} as Listing;

  currentItems: Item[];

  profileData: FirebaseObjectObservable<Profile>;
  listingRef$: FirebaseObjectObservable<Listing>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public items: Items, private afDatabase: AngularFireDatabase, public toast: ToastController){

    const listingId = this.navParams.get('listingId');

    this.listingRef$ = this.afDatabase.object(`listing/${listingId}`);


  }
}
