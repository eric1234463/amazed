import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
export class HealthPage implements OnInit  {
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
  public lineChartLabels: Array<String> = [];
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(67,191,199,0.2)',
      borderColor: 'rgba(67,191,199,1)',
      pointBackgroundColor: 'rgba(67,191,199,0.1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(67,191,199,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(0,186,255,0.2)',
      borderColor: 'rgba(0,186,255,1)',
      pointBackgroundColor: 'rgba(0,186,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,186,255,0.8)'
    }
  ];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  constructor(public navCtrl: NavController, public navParams: NavParams, public health: Health, public feedService : FeedService) {

  }

  async ngOnInit(){
    for (let i = 7; i > 0; i--) {
      let date = moment()
        .subtract(i, 'd')
        .format('DD');
      this.lineChartLabels.push(date);
    }
    this.currentWeather = Math.round(await this.feedService.getWeather() - 273.15);
    this.lineChartData = await this.feedService.getClocks();
    this.currentSleep = this.lineChartData[0].data[6];
    this.currentSleepProgress = this.lineChartData[0].data[6] / 10 * 100;
    this.health
      .isAvailable()
      .then((available: boolean) => {
        this.health
          .requestAuthorization(['distance', 'steps'])
          .then(res => {
            this.health
              .queryAggregated({
                startDate: new Date(), // 1 days ago
                endDate: new Date(),
                dataType: 'steps',
                bucket: 'day'
              })
              .then(steps => {
                if (!!steps) {
                  this.currentStep = parseInt(steps[0].value, 10);
                  this.feedService.createWalkingStep(steps[0].value, new Date());
                  this.currentStepProgress = this.currentStep / this.maxStep * 100;
                }
              });
            this.health
              .queryAggregated({
                startDate: new Date(), // 1 days ago
                endDate: new Date(),
                dataType: 'distance',
                bucket: 'day'
              })
              .then(distance => {
                if (!!distance) {
                  this.currentDistance = parseInt(distance[0].value, 10);
                  this.currentDistanceProgress = this.currentDistance / this.maxStep * 100;
                }
              })
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
}
