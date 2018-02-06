import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Clock } from '../../services/feed';
import moment from 'moment';
/**
 * Generated class for the SleepDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'sleep-detail',
  segment: 'sleep-detail'
})
@Component({
  selector: 'page-sleep-detail',
  templateUrl: 'sleep-detail.html',
})
export class SleepDetailPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 7; i > 0; i--) {
      let date = moment()
        .subtract(i, 'd')
        .format('DD');
      this.lineChartLabels.push(date);
    }
    this.lineChartData = this.navParams.get('data');
  }

  ionViewDidLoad() {

  }

}
