import { Component, OnInit } from "@angular/core";
import {
    NavController,
    NavParams,
    IonicPage,
    PopoverController
} from "ionic-angular";
import { RecordService } from "../../services/record";
import { Record } from "../../services/interface";

@IonicPage({
    name: "record-detail",
    segment: "record-detail/:id"
})
@Component({
    selector: "page-record-detail",
    templateUrl: "record-detail.html"
})
export class RecordDetailPage implements OnInit {
    public record: Record;
    public id: String;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public popoverCtrl: PopoverController,
        public recordService: RecordService
    ) {}
    async ngOnInit() {
        this.id = this.navParams.get("id");
        this.record = await this.recordService.getRecordByID(this.id);
    }
    rate() {

    }
}
