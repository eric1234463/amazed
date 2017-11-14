import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root: any = 'home'
    tab2Root: any = 'qr';
    tab3Root: any = 'profile';

    constructor() {

    }
    ionViewDidEnter() {
        this.tabRef.select(0);
    }
}
