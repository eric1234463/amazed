import { Component, ViewChild } from "@angular/core";
import { Tabs } from "ionic-angular";
import { IonicPage } from "ionic-angular";

@IonicPage({
    name: "tab",
    segment: "tab"
})
@Component({
    selector: "tabs",
    templateUrl: "tabs.html"
})
export class TabsPage {
    @ViewChild("myTabs") tabRef: Tabs;

    tab1Root: any = "feed";
    tab2Root: any = "record";
    tab3Root: any = "qr";
    tab4Root: any = "explore";
    tab5Root: any = "more";
    constructor() {}
}
