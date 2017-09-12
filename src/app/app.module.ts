import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProfilePage} from '../pages/profile/profile';
import {GeneratrorPage} from '../pages/qr/qr';
import {TabsPage} from '../pages/tabs/tabs';
import {RecordEntryInfoPage} from '../pages/home/recordentryinfo/recordentryinfo'
import {StatusBar} from '@ionic-native/status-bar';
import {NativeStorage} from '@ionic-native/native-storage';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QRCodeModule} from 'angular2-qrcode';
import {UserService} from '../services/user';
import {EditPage} from '../pages/profile/editProfile/edit';

@NgModule({
	declarations: [
		MyApp,
		ProfilePage,
		GeneratrorPage,
		HomePage,
		RecordEntryInfoPage,
		TabsPage,
		EditPage
	],
	imports: [
		BrowserModule, QRCodeModule, IonicModule.forRoot(MyApp
			, {
				mode: 'ios'
			})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ProfilePage,
		GeneratrorPage,
		HomePage,
		RecordEntryInfoPage,
		TabsPage,
		EditPage
	],
	providers: [
		StatusBar,
		UserService,
		NativeStorage,
		SplashScreen, {
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {
}