import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, User } from '../../services/user';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'feed',
    segment: 'feed'
}) @Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
})
export class FeedPage {
    public today = new Date();
    public user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
         this.userService.getUser().then(user=>{
            this.user = user;
        });

    }

}
