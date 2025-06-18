import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs]
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
