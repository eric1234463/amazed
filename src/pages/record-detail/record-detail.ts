import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController, LoadingController } from 'ionic-angular';
import { RecordService } from '../../services/record';
import { Record } from '../../services/interface';

@IonicPage({
  name: 'record-detail',
  segment: 'record-detail/:id'
})
@Component({
  selector: 'page-record-detail',
  templateUrl: 'record-detail.html'
})
export class RecordDetailPage {
  public record: Record;
  public id: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public recordService: RecordService,
    public loadingCtrl: LoadingController
  ) {}

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.id = this.navParams.get('id');
    this.record = await this.recordService.getRecordByID(this.id);
    loading.dismiss();
  }

  goToMedicine(medicine) {
    this.navCtrl.push('medicine-detail',{
      id: medicine.id
    })
  }
}
