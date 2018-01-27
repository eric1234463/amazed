import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { NativeStorage } from "@ionic-native/native-storage";
import { RecordService } from "../../services/record";
import { Record } from "../../services/interface";

@IonicPage({
    name: "record",
    segment: "record"
})
@Component({
    selector: "page-record",
    templateUrl: "record.html"
})
export class RecordPage implements OnInit {
    public records: Record[];

    constructor(
        public nativeStorage: NativeStorage,
        public recordService: RecordService,
        public navCtrl: NavController
    ) {}

    async ngOnInit() {
        this.records = await this.recordService.getRecords();
    }

    goToDetail(record) {
        this.navCtrl.push("record-detail", {
            id: record.id
        });
    }
}
