import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { GeneratrorPage } from '../qr/qr';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GeneratrorPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
