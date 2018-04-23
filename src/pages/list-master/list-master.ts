import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams, Slides, Events} from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
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
import { Category } from './../../models/category';
import { storage, initializeApp } from 'firebase';
import { ListViewPage } from '../list-view/list-view';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

export interface Slide {
  title: string;
}

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
@ViewChild(Slides) slides: Slides;



  currentItems: Array<Listing>;
  public services = [];
  public photo = [];

  public filteredItems = [];

  listingRef$: FirebaseListObservable<Listing[]>;
  searchRef$: FirebaseListObservable<Listing[]>;

  listingData: FirebaseObjectObservable<Listing>;
  profileData: FirebaseObjectObservable<Profile>;

  public selectedCategory: Category;
    public categories: Array<Category>;
    public showLeftButton: boolean;
    public showRightButton: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public modalCtrl: ModalController, private afAuth: AngularFireAuth, private toast: ToastController, private database: AngularFireDatabase) {

    this.listingRef$ = this.database.list('listing/');

    this.categories=[{
      id: "All",
      name: "All"

    },
    {
      id:"Cosmetology",
      name:"Cosmetology"
    },
    {
      id:"Repair",
      name:"Repair"
    },
    {
      id:"Apparel",
      name:"Apparel"
    }

    ]


  }

  /**
  * The view loaded, let's query our items for the list
  */
  ionViewDidLoad() {
    /*this.afAuth.authState.take(1).subscribe(data => {
    this.users.email = data.email;

    //this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    //this.listingData = this.afDatabase.object(`profile/${data.uid}/listing`)
    //this.listingData = this.afDatabase.object(`listing/${cosmotology})
  });*/
}

private initializeCategories(): void{

  this.selectedCategory = this.categories[0];

  this.showLeftButton = false;
  this.showRightButton = this.categories.length > 3;
}

public filterData(categoryId: string): void{
  this.listingRef$.subscribe((_listingRef$) => {
    this.filteredItems = [];
    _listingRef$.forEach(listingRef$ => {
      if(listingRef$.catagory.toLowerCase().indexOf(categoryId.toLowerCase()) > -1){
        this.filteredItems.push(listingRef$);
      }
    })
  });


}

public slideChanged(): void {
        let currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    }

    // Method that shows the next slide
    public slideNext(): void {
        this.slides.slideNext();
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.slides.slidePrev();
    }


getUsers(){
  return this.database.list('profile/')
}

viewListing(clisting: Listing){

  this.navCtrl.push('ListViewPage', { listingId: clisting.$key});
}

/**
* Prompt the user to add a new item. This shows our ItemCreatePage in a
* modal and then adds the new item to our data source if the user created one.
*/
addItem() {
  let addModal = this.modalCtrl.create('ItemCreatePage');
  addModal.onDidDismiss(item => {
    if (item) {
      this.items.add(item);
    }
  })
  addModal.present();
}

/**
* Delete an item from the list of items.
*/
deleteItem(item) {
  this.items.delete(item);
}

/**
* Navigate to the detail page for this item.
*/
openItem(item: Item) {
  this.navCtrl.push('ItemDetailPage', {
    item: item
  });
}


getItems(ev) {
  let val = ev.target.value;
  this.listingRef$.subscribe((_listingRef$) => {
    this.filteredItems = [];
    _listingRef$.forEach(listingRef$ => {
      if(listingRef$.title.toLowerCase().indexOf(val.toLowerCase()) > -1){
        this.filteredItems.push(listingRef$);
      }
    })
  });

}

}
