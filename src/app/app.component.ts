import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { RecordService } from '../services/record';
import 'rxjs/add/operator/switchMap'

@Component({ templateUrl: 'app.html' })
export class MyApp {

    public rootPage;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public recordService: RecordService) {
        this.recordService.initRecords().then(records => {
            console.log(records);
        });
        platform
            .ready()
            .then(() => {
                // Okay, so the platform is ready and our plugins are available. Here you can do
                // any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();
                afAuth.authState.subscribe(user => {
                    if (user == undefined) {
                        this.rootPage = 'login'
                    } else {
                        this.rootPage = TabsPage;
                    }
                })

            });
    }
}
