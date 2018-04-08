import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'feedback',
  name: 'feedback'
})
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
  public rate = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  submit() {
    this.navCtrl.pop();
  }

}
