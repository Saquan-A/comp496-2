import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController } from 'ionic-angular';
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


import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-create',
  templateUrl: 'list-create.html'
})

export class ListCreatePage {
  imageURI:any;
  imageFileName:any;

  public myPerson = {};

  users = {} as Users;
  profile = {} as Profile;
  listing = {} as Listing;

  currentItems: Item[];

  profileData: FirebaseObjectObservable<Profile>;
  listingData: FirebaseObjectObservable<Listing>;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public items: Items, private afDatabase: AngularFireDatabase, public toast: ToastController, public camera: Camera){
    this.listing.photo = "https://firebasestorage.googleapis.com/v0/b/login-authentifcation.appspot.com/o/NjNzDE3TlmDwoJ1ArrCj_Gnome-stock_person-avatar-profile.png?alt=media&token=9876bfb1-e502-426b-94ad-97ec4144b18e";
    this.imageFileName = 'assets/img/NjNzDE3TlmDwoJ1ArrCj_Gnome-stock_person-avatar-profile.png';

  }

  ionViewDidEnter() { //Creates snapshot and sends data to profile page, created by Aaren, Tyrique, and Olivier


  }

  async getImage() {

    try{
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
        this.imageFileName = 'data:image/jpeg;base64,' + imageData;
      })

      const imageResult = await this.camera.getPicture(options);


      const image =  `data:image/jpeg;base64,${imageResult}`;

      const pictures = storage().ref('pictures/myPhoto');
      pictures.putString(this.imageFileName, 'data-url');

    } catch (e){
      console.error(e);
    }

  }

  async createListing(listing: Listing){


    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`listing/${listing.title}${auth.uid}`).set(
        this.listing)
      .then(() => this.navCtrl.push('ListMasterPage'))
    });

  }



}
