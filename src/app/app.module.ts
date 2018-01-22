import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageLoader } from 'ionic-image-loader';
import { UserService } from '../services/user';
import { FeedService } from '../services/feed';
import { RecordService } from '../services/record';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Facebook } from '@ionic-native/facebook';
import { RateComponent } from '../components/rate/rate';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { ChartsModule } from 'ng2-charts';

const config: SocketIoConfig = { url: 'https://herefyp.herokuapp.com', options: {} };
const providers = {
    "facebook": {
        "clientId": "292006121312524",
        "apiVersion": "v2.5" //like v2.4
    }
};

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        RateComponent
    ],
    imports: [
        BrowserModule,
        IonicImageLoader.forRoot(),
        IonicStorageModule.forRoot(),
        Angular2SocialLoginModule,
        IonicModule.forRoot(MyApp
            , {
                mode: 'ios',
                tabsHideOnSubPages: 'true'
            }),
        SocketIoModule.forRoot(config),
        Ionic2RatingModule,
        HttpModule,
        HttpClientModule,
        MomentModule,
        ChartsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        RateComponent
    ],
    providers: [
        StatusBar,
        NativeStorage,
        BarcodeScanner,
        RecordService,
        FeedService,
        UserService,
        Facebook,
        GoogleMaps,
        SplashScreen, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})

export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
