import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegistrationPage } from '../pages/registration/registration';
import { Settings } from '../providers/providers';
import { BusinessProfilePage } from '../pages/business-profile/business-profile';
import { ListCreatePage } from '../pages/list-create/list-create';
import { ListViewPage } from '../pages/list-view/list-view';


import firebase from 'firebase';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;


  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    //{ title: 'Tutorial', component: 'TutorialPage' },
  //  { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Profile', component: 'BusinessProfilePage' },
    { title: 'Listings', component: 'ListMasterPage' },
    { title: 'Settings', component: 'ContentPage' },
    { title: 'Logout', component: 'LoginPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      firebase.initializeApp({
        apiKey: "AIzaSyBjPNRn3v_7lkb7Fmm9yZmypyaQiYyHxV0",
        authDomain: "login-authentifcation.firebaseapp.com",
        databaseURL: "https://login-authentifcation.firebaseio.com",
        projectId: "login-authentifcation",
        storageBucket: "login-authentifcation.appspot.com",
        messagingSenderId: "840125889678"
      });

      /*firebase.initializeApp({
        apiKey: "AIzaSyBjPNRn3v_7lkb7Fmm9yZmypyaQiYyHxV0",
        authDomain: "login-authentifcation.firebaseapp.com",
        databaseURL: "https://login-authentifcation.firebaseio.com",
        projectId: "login-authentifcation",
        storageBucket: "login-authentifcation.appspot.com",
        messagingSenderId: "840125889678"
      });*/
    });
    this.initTranslate();
  }



  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
