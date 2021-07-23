import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
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
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';



@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  imageURI:any;
  imageFileName:any;


  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: '@aggies.ncat.edu',
    password: 'test'
  };


  users = {} as Users;
  profile = {} as Profile;


  // Our translated text strings
  private signupErrorString: string;
  public signupForm;
  loading: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toast: ToastController,
    public translateService: TranslateService,
    private afAuth: AngularFireAuth,
    public camera: Camera,
    private fileTransfer: FileTransfer,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private afDatabase: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })

      this.imageFileName = "https://firebasestorage.googleapis.com/v0/b/login-authentifcation.appspot.com/o/NjNzDE3TlmDwoJ1ArrCj_Gnome-stock_person-avatar-profile.png?alt=media&token=9876bfb1-e502-426b-94ad-97ec4144b18e";
      this.profile.photo = "https://firebasestorage.googleapis.com/v0/b/login-authentifcation.appspot.com/o/NjNzDE3TlmDwoJ1ArrCj_Gnome-stock_person-avatar-profile.png?alt=media&token=9876bfb1-e502-426b-94ad-97ec4144b18e";

  }

  async register(users: Users){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        users.email,
        users.password
      );

      result.sendEmailVerification().then(function(){
        console.log("Email verification sent to user");
      });

      if(result){
        this.navCtrl.setRoot('LoginPage');
      }
    } catch (e){
      console.error(e);
    }
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

  async captureImage() {
   const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     sourceType: this.camera.PictureSourceType.CAMERA
   }

   return await this.camera.getPicture(options)
}


createUploadTask(file: string): void {

    const filePath = `userProfile_${ new Date().getTime() }.jpg`;

    this.imageFileName = 'data:image/jpg;base64,' + file;
    const pictures = storage().ref(filePath).putString(this.imageFileName, 'data_url');


}

async uploadHandler() {
   const base64 = await this.captureImage();
   this.createUploadTask(base64);
}

async createProfile(users: Users, profile: Profile){
  let photo = this.imageFileName;

  try{
    const result1 = await this.afAuth.auth.createUserWithEmailAndPassword(
      users.email,
      users.password
    );

    result1.sendEmailVerification().then(function(){
      console.log("Email verification sent to user");
    });

    if(result1){
      this.navCtrl.setRoot('LoginPage');
    }
  } catch (e){
    console.error(e);
  }

  this.afAuth.authState.take(1).subscribe(auth => {
    this.afDatabase.object(`profile/${auth.uid}`).set(
      this.profile)
    .then(() => this.navCtrl.push('LoginPage'))
  });
}

Login(){
  this.navCtrl.setRoot('LoginPage');
}


}
