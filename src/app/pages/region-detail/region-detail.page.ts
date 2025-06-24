import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonItem, IonList, IonButtons, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RegionUtilsService } from 'src/app/services/region-utils.service';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.page.html',
  styleUrls: ['./region-detail.page.scss'],
  standalone: true,
  imports: [NgFor, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonItem, IonList, IonButtons, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonBackButton]
})
export class RegionDetailPage implements OnInit {
  private httpService = inject(HttpService);
  private route = inject(ActivatedRoute);

  region: any = null;
  isLoading: boolean = true;

  constructor(private utils: UtilsService, private regionUtils: RegionUtilsService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    console.log(name)
    this.getRegionDetail(name || '');
  }

  private getRegionDetail(name: string) {
    // Recebendo dados da região em específico procurando pelo nome
    this.httpService.getRegionDetail(name).subscribe((data: any) => {
      this.region = data;
      console.log(this.region)
    });
  }

  getRegionImage(name: string) {
    return this.regionUtils.getGameImage(name)
  }

  formatName(name:string) {
    return this.utils.formatName(name);
  }

}
