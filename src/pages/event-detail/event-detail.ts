import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  currentEvent: any;
  guestName: string = '';
  guestPicture: any = null;
  
  constructor(public nav: NavController, public navParams: NavParams, 
    public eventData: EventData, public cameraPlugin: Camera) {}

  ionViewDidEnter(){
    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', snapshot => {
      this.currentEvent = snapshot.val();
      this.currentEvent.id = snapshot.key;
    });
  }

  addGuest(guestName) {
    this.eventData.addGuest(guestName, this.currentEvent.id, this.currentEvent.price, this.guestPicture).then(() => {
      this.guestName = '';
      this.guestPicture = null;
    });
  }

  takePicture(){
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
