import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FeedService } from '../../services/feed';
import { Step, Distance } from '../../services/interface';

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
  templateUrl: 'walk-detail.html'
})
export class WalkDetailPage {
  public steps: Step[];
  public distances: Distance[];
  public page: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedService: FeedService,
    public loadingCtrl: LoadingController
  ) {}

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.page = this.navParams.get('page');
    const steps = await this.feedService.getWalkingStep();
    const distances = await this.feedService.getWalkingDistance();

    this.steps = steps.map(step => {
      step.currentProgress = step.step / 10000 * 100;
      return step;
    });
    this.distances = distances.map(distance => {
      distance.currentProgress = distance.distance / 10000 * 100;
      return distance;
    });

    loading.dismiss();
  }
}
