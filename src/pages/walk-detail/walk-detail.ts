import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService } from '../../services/feed';
import { Step } from '../../services/interface';

/**
 * Generated class for the WalkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'walk-detail',
  segment: 'walk-detail'
})
@Component({
  selector: 'page-walk-detail',
  templateUrl: 'walk-detail.html',
})
export class WalkDetailPage {
  public steps: Step[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public feedService : FeedService) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad WalkDetailPage');
    const steps = await this.feedService.getWalkingStep();
    this.steps = steps.map(step=>{
      step.currentProgress = step.step / 10000 * 100;
      return step;
    });
  }

}
