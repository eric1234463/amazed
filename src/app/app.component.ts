import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../services/user';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';

@Component({ templateUrl: 'app.html' })
export class MyApp {
  public rootPage;
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userService: UserService,
    private push: Push,
    private storage: Storage,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do
      // any higher level native things you might need.
      splashScreen.hide();
      userService
        .getUser()
        .then(user => {
          if (user == null || user == undefined) {
            this.rootPage = 'login';
          } else {
            this.rootPage = 'tab';
          }
        })
        .catch(e => {
          this.rootPage = 'login';
        });
      statusBar.styleDefault();
    });
  }

  initPushNotification() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const options: PushOptions = {
        android: {
          senderID: '1069815185055',
          icon: 'icon.png',
          vibrate: 'true',
          sound: 'true'
        },
        ios: {
          alert: true,
          badge: true,
          sound: true
        },
        windows: {}
      };
      const pushObject: PushObject = this.push.init(options);

      // subscribe to news channel
      pushObject.subscribe('news');

      pushObject.on('registration').subscribe((data: any) => {
        this.storage.set('device_token', data.registrationId);
      });

      pushObject.on('notification').subscribe((data: any) => {
        console.log('message', data.message);
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          console.log('Push notification clicked');
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          console.log('Push notification clicked');
        }
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }
  }
}
