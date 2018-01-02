import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { MomentModule } from 'angular2-moment';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../services/user';
import { FeedService } from '../services/feed';
import { RecordService } from '../services/record';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Facebook } from '@ionic-native/facebook';
import { RateComponent } from '../components/rate/rate';
@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        RateComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp
            , {
                mode: 'ios'
            }),
        Ionic2RatingModule,
        MomentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
        AngularFirestoreModule.enablePersistence(),
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
        SplashScreen, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule {
}
