import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = 'home'
  tab2Root :any = 'qr';
  tab3Root :any = 'profile';

  constructor() {

  }
}
