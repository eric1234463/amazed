import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { RecordService } from '../../services/record';
import { Record } from '../../services/interface';

@IonicPage({
  name: 'record',
  segment: 'record'
})
@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {
  public records: Record[];

  constructor(
    public nativeStorage: NativeStorage,
    public recordService: RecordService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.records = await this.recordService.getRecords();
    loading.dismiss();
  }

  goToDetail(record) {
    this.navCtrl.push('record-detail', {
      id: record.id
    });
  }
}
