import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
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
import { ListMasterPage } from '../list-master/list-master';
import { BusinessProfilePage } from '../business-profile/business-profile';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  users = {} as Users;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toast: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ionViewDidEnter() {
    this.afAuth.auth.signOut();
  }

  async loginUser(users: Users) {

    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(users.email, users.password);
        this.afAuth.authState.subscribe(data => {
          if(data && data.email == users.email && data.uid){
            this.toast.create({
              message: `Welcome to Campus Connect, ${data.email}`,
              duration: 3000
            }).present();
            this.navCtrl.setRoot('TabsPage');
          }
        });
    } catch (e) {
      this.toast.create({
        message: e,
        duration: 3000
      }).present();

    }




  }



}
