import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root: any = 'feed'
    tab2Root: any = 'record';
    tab3Root: any = 'qr';
    tab4Root: any = 'notification';
    tab5Root: any = 'more';
    constructor() {

    }
    ionViewDidEnter() {
        this.tabRef.select(0);
    }
}
