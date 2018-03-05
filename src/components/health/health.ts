import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Clock, FeedService } from '../../services/feed';
import moment from 'moment';
import { Health } from '@ionic-native/health';
import { UserService } from '../../services/user';
import { Patient, HealthRank } from '../../services/interface';

/**
 * Generated class for the HealthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-health',
  templateUrl: 'health.html'
})
export class HealthPage implements OnInit {
  private currentDistance = 0;
  private currentStep = 0;
  private maxStep = 10000;
  private currentWeather = 0;
  private maxSleep = 10;
  private currentSleep = 0;
  private currentStepProgress = 0;
  private currentSleepProgress = 0;
  private currentDistanceProgress = 0;
  private lineChartData: Clock[];
  private lineChartLegend: boolean = true;
  private lineChartType: string = 'line';
  private healthRank: HealthRank;
  private user: Patient;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private health: Health,
    private feedService: FeedService,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.healthRank = {
      sleep: 0,
      total: 0,
      step: 0,
      distance: 0,
      bmi: 0
    };
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    try {
      this.currentWeather = Math.round((await this.feedService.getWeather()) - 273.15);
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
      }
      loading.dismiss();
    } catch (error) {
      console.error(error);
      loading.dismiss();
    }
    this.calculateHealthRanking();
  }
  calculateHealthRanking() {
    this.user.bmi = this.user.weight / Math.pow(this.user.height / 100, 2);
    if (this.user.bmi < 18.5) {
      this.healthRank.bmi = 10;
    } else if (this.user.bmi < 18.5) {
      this.healthRank.bmi = 15;
    } else {
      this.healthRank.bmi = 5;
    }
    this.healthRank.distance = Math.round(this.currentDistance / 1000) * 5;
    this.healthRank.step = Math.round(this.currentStep / 1000) * 2;
    this.healthRank.sleep = Math.round(this.currentSleep / 10) * 10;
    this.lineChartData[0].data.forEach(sleepHour => {
      if (sleepHour > 8) {
        this.healthRank.sleep += 2;
      }
    });
    this.healthRank.total =
      this.healthRank.bmi + this.healthRank.distance + this.healthRank.sleep + this.healthRank.step;
    this.feedService.createHealthStatus(
      this.healthRank.total,
      this.currentStep,
      this.currentDistance,
      new Date()
    );
  }

  goToSleepDetail() {
    this.navCtrl.push('sleep-detail', {
      data: this.lineChartData
    });
  }

  goToWalkDetail() {
    this.navCtrl.push('walk-detail');
  }
}
