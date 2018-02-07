import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Clock, FeedService } from '../../services/feed';
import moment from 'moment';
import { Health } from '@ionic-native/health';

/**
 * Generated class for the HealthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-health',
  templateUrl: 'health.html',
})
export class HealthPage implements OnInit {
  public currentDistance = 0;
  public currentStep = 0;
  public maxStep = 10000;
  public currentWeather = 0;
  public maxSleep = 10;
  public currentSleep = 0;
  public currentStepProgress = 0;
  public currentSleepProgress = 0;
  public currentDistanceProgress = 0;
  public lineChartData: Clock[];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  constructor(public navCtrl: NavController, public navParams: NavParams, public health: Health, public feedService: FeedService, public loadingCtrl: LoadingController) {

  }

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    try {
      this.currentWeather = Math.round(await this.feedService.getWeather() - 273.15);
      this.lineChartData = await this.feedService.getClocks();
      this.currentSleep = this.lineChartData[0].data[6];
      this.currentSleepProgress = this.lineChartData[0].data[6] / 10 * 100;
      const healthIsAvailable = await this.health.isAvailable();
      if (healthIsAvailable) {
        const Authorization = await this.health.requestAuthorization(['distance', 'steps']);
        const steps = await this.health.queryAggregated({
          startDate: new Date(), // 1 days ago
          endDate: new Date(),
          dataType: 'steps',
          bucket: 'day'
        });
        const distances = await this.health.queryAggregated({
          startDate: new Date(), // 1 days ago
          endDate: new Date(),
          dataType: 'distance',
          bucket: 'day'
        });
        this.currentStep = parseInt(steps[0].value);
        this.currentDistance = parseInt(distances[0].value);
        this.currentStepProgress = this.currentStep / this.maxStep * 100;
        this.currentDistanceProgress = this.currentDistance / this.maxStep * 100;
        this.feedService.createWalkingStep(this.currentStep, this.currentDistance, new Date());
      }
      loading.dismiss();
    } catch (error) {
      console.error(error);
      loading.dismiss();
    }
  }

  goToSleepDetail() {
    this.navCtrl.push('sleep-detail', {
      data: this.lineChartData
    })
  }

  goToWalkDetail() {
    this.navCtrl.push('walk-detail');
  }
}
