import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from '../services/user';
import 'rxjs/add/operator/switchMap'

@Component({ templateUrl: 'app.html' })
export class MyApp {

    public rootPage;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService) {

        platform
            .ready()
            .then(() => {
                // Okay, so the platform is ready and our plugins are available. Here you can do
                // any higher level native things you might need.
                userService.getUser().then(user => {
                    if (user !== null) {
                        this.rootPage = TabsPage;
                    } else {
                        this.rootPage = 'login';
                    }
                })
                statusBar.styleDefault();
            });
    }
}
