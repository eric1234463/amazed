import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedService } from '../../services/feed';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'health',
  segment: 'health'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public showModal = false;
  public content = 'Health status';

  constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public modalCtrl: ModalController) {

  }

  async ionViewDidLoad() {
    const status = await this.feedService.getClock('WAKE', new Date());
    if (status.status === false) {
      this.showModal = true;
    }
    if (this.showModal) {
      this.modalCtrl.create('clock').present();
    }
  }

}
