import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { UserService } from "../services/user";

@Component({ templateUrl: "app.html" })
export class MyApp {
    public rootPage;
    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        userService: UserService
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available. Here you can do
            // any higher level native things you might need.
            const user = userService.getUser();
            if (user !== null) {
                this.rootPage = "tab";
            } else {
                this.rootPage = "login";
            }

            statusBar.styleDefault();
        });
    }
}
