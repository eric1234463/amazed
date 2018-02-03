import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import moment from 'moment';
import { Clock, FeedService } from '../../services/feed';
import { Feed } from '../../services/interface';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'feed',
  segment: 'feed'
})
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage implements OnInit {
  public currentStep = 0;
  public maxStep = 10000;
  public maxSleep = 10;
  public currentSleep = 0;
  public currentStepProgress = 0;
  public currentSleepProgress = 0;
  public feeds: Feed[];
  public content = 'status';
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
  public showModal = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedService: FeedService,
    public imageLoaderConfig: ImageLoaderConfig,
    public modalCtrl: ModalController,
    public health: Health
  ) {}
  public async ngOnInit() {
    const status = await this.feedService.getClock('WAKE', new Date());
    if (status.status === false) {
      this.showModal = true;
    }
    if (this.showModal) {
      this.modalCtrl.create('clock').present();
    }
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.enableSpinner(true);
    this.feeds = await this.feedService.getFeeds();
    for (let i = 7; i > 0; i--) {
      let date = moment()
        .subtract(i, 'd')
        .format('DD');
      this.lineChartLabels.push(date);
    }
    this.lineChartData = await this.feedService.getClocks();
    this.currentSleep = this.lineChartData[0].data[6];
    this.currentSleepProgress = this.lineChartData[0].data[6] / 10 * 100;
    this.health
      .isAvailable()
      .then((available: boolean) => {
        this.health
          .requestAuthorization(['distance', 'steps'])
          .then(res =>
            this.health
              .queryAggregated({
                startDate: new Date(), // 1 days ago
                endDate: new Date(),
                dataType: 'steps',
                bucket: 'day'
              })
              .then(steps => {
                if (!!steps) {
                  this.currentStep = parseInt(steps[0].value, 1);
                  this.feedService.createWalkingStep(steps[0].value, new Date());
                  this.currentStepProgress = this.currentStep / this.maxStep * 100;
                }
              })
          )
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  public goToDetail(feed) {
    // this.feedService.addfeed(feed);
    this.navCtrl.push('feed-detail', {
      id: feed.id
    });
  }
}
