import { Component, OnInit } from "@angular/core";
import {
    IonicPage,
    NavController,
    NavParams,
    ModalController
} from "ionic-angular";
import { FeedService, Clock } from "../../services/feed";
import { Feed } from "../../services/interface";
import { ImageLoaderConfig } from "ionic-image-loader";
import moment from "moment";
/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: "feed",
    segment: "feed"
})
@Component({
    selector: "page-feed",
    templateUrl: "feed.html"
})
export class FeedPage implements OnInit {
    public currentStep: number = 1000;
    public maxStep = 10000;
    public maxSleep = 10;
    public currentStepProgres = this.currentStep / this.maxStep * 100;
    public currentSleepProgres = 0;
    public feeds: Feed[];
    public content = "status";
    public lineChartData: Clock[];
    public lineChartLabels: Array<String> = [];
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
    public lineChartType: string = "line";
    public showModal = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public feedService: FeedService,
        public imageLoaderConfig: ImageLoaderConfig,
        public modalCtrl: ModalController
    ) {}
    async ngOnInit() {
        const status = await this.feedService.getClock("WAKE", new Date());
        if (status.status === false) {
            this.showModal = true;
        } else {
            console.log(status);
        }
        if (this.showModal) {
            this.modalCtrl.create("clock").present();
        }
        this.imageLoaderConfig.setBackgroundSize("cover");
        this.imageLoaderConfig.enableSpinner(true);
        this.feeds = await this.feedService.getFeeds();

        for (let i = 7; i > 0; i--) {
            let date = moment()
                .subtract(i, "d")
                .format("DD");
            this.lineChartLabels.push(date);
        }
        this.lineChartData = await this.feedService.getClocks();
        this.currentSleepProgres = Math.abs(
            this.lineChartData[0].data[6] -
                this.lineChartData[1].data[6] / 10 * 100
        );
    }

    goToDetail(feed) {
        //this.feedService.addfeed(feed);
        this.navCtrl.push("feed-detail", {
            id: feed.id
        });
    }
}
