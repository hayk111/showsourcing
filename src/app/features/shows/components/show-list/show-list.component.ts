import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'show-list-app',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent implements OnInit {
  items = [
    {
      description: {
        name: 'AGENDA TRADE SHOW - Las Vegas ',
        description: 'Agenda is the most diverse and creative lifestyle sdq dqsd qsdzzzegdsfdfdsfdsfdsf fashion trade show in the world. Since 2003, Agenda has emerged as the premier destination for brands and retailers to converge. Agenda is where passion becomes profit and the business of creativity is conducted in a truly authentic environment. ',
        startDate: new Date(),
        endDate: new Date(),
        logoImage: {
          fileName: '04b37945-f690-4bff-a5cd-9e0e646b77a0.jpg'
        },
        primaryColor: '#45ADFF',
        secondaryColor: '#80CEFF',
        venue: {
          name: 'Sands Expo at Venetian | Palazzo',
          countryCode: 'US',
          addressFull: 'Hall B 201 Sands Avenue Las Vegas, NV 89169',
          city: 'Las Vegas, NV',
        }
      }
    },
    {
      description: {
        name: 'AGENDA TRADE SHOW - Las Vegas ',
        description: 'Agenda is the most diverse and creative lifestyle fashion trade show in the world. Since 2003, Agenda has emerged as the premier destination for brands and retailers to converge. Agenda is where passion becomes profit and the business of creativity is conducted in a truly authentic environment. ',
        startDate: new Date(),
        endDate: new Date(),
        logoImage: {
          fileName: '04b37945-f690-4bff-a5cd-9e0e646b77a0.jpg'
        },
        primaryColor: '#45ADFF',
        secondaryColor: '#80CEFF',
        venue: {
          name: 'Sands Expo at Venetian | Palazzo',
          countryCode: 'US',
          addressFull: 'Hall B 201 Sands Avenue Las Vegas, NV 89169',
          city: 'Las Vegas, NV',
        }
      }
    }
  ];
  constructor() { }

  ngOnInit() {
  }


  getGradient(item: any) {
    return `linear-gradient(${item.description.secondaryColor}, ${item.description.primaryColor})`;
  }
}
