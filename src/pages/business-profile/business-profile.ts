import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
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
import { storage, initializeApp } from 'firebase';
import { LoginPage } from '../login/login';
import { ListCreatePage } from '../list-create/list-create';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-business-profile',
  templateUrl: 'business-profile.html'
})

export class BusinessProfilePage {
  public myPerson = {};

  users = {} as Users;
  profile = {} as Profile;

  currentItems: Item[];

  profileData: FirebaseObjectObservable<Profile>;


  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public items: Items, private afDatabase: AngularFireDatabase, public toast: ToastController){

  }

  ionViewDidEnter() { //Creates snapshot and sends data to profile page, created by Aaren, Tyrique, and Olivier
    this.afAuth.authState.take(1).subscribe(data => {
      this.users.email = data.email;

      this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    });





  }
  goToUpdateProfile(params){

  }

  addList(){
    this.navCtrl.push('ListCreatePage');
  }

  logOutUser(){
    this.navCtrl.push('LoginPage');
  }



}
