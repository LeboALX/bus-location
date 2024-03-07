import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {

  directionsResults: any;

  private map!: google.maps.Map;
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;

  zoom: number = 15;
  center: any;

  busStops: any[] = [
    // Route 1 
    {
      title: 'randburg',
      position: { lat: -26.099111550000003, lng: 28.002470214946314 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },
    // To
    {
      title: 'johannesburg',
      position: { lat: -26.205, lng: 28.049722 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },

    // Route 2
    {
      title: 'Sandton',
      position: { lat: -26.1086844, lng: 28.0582833 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },
    // To
    {
      title: 'Edenvale',
      position: { lat: -26.1183893, lng: 28.1410332 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },
    // Route 3
    {
      title: 'Soweto',
      position: { lat: -26.2227778, lng: 27.89 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },
    // To
    {
      title: 'Soweto',
      position: { lat: -26.2227778, lng: 27.89 },
      icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
    },


  ]

  alternativeStops: any[] = []

  availableBuses: any[] = [
    {
      title: 'bus-001',
      icon: '../../assets/images/bus-marker-icon_resized.png',
    }
  ]

  movingBus: any[] = [
    {
      title: 'randburg',
      position: { lat: -26.099111550000003, lng: 28.002470214946314 },
    },
    {
      title: 'Stop 1',
      position: { lat: -26.14906, lng: 28.009492 },
    },
    {
      title: 'Stop 2',
      position: { lat: -26.182785, lng: 28.017755 },
    },
    {
      title: 'Stop 3',
      position: { lat: -26.201923, lng: 28.03123 },
    },
    {
      title: 'Johannesburg',
      position: { lat: -26.2, lng: 28.1 },
    },

  ]

  constructor(private zone: NgZone) {
    this.getMyCurrentLocation();

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });

    // track bus, updates every 3 seconds
    // setInterval(() => {
    this.getMyCurrentLocation();
    // }, 3000); 
  }

  //? Danger - tracking code: -- used to track the bus moving
  getMyCurrentLocation(): void {

    navigator.geolocation.getCurrentPosition(location => {
      this.center = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }

      console.log('Current Location : ', this.center)
      this.availableBuses[0].position = this.center;
      // this.calculateAndDisplayRoute();
    })
    let count = 0
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(location => {
        this.center = {
          lat: this.movingBus[count].position.lat,
          lng: this.movingBus[count].position.lng
        }

        console.log('Current Location : ', this.center)
        this.availableBuses[0].position = this.center;
        count++
        // this.calculateAndDisplayRoute();
      })
    }, 3000);

  }

  // adding the route from origin and destination
  calculateAndDisplayRoute() {
    const request: google.maps.DirectionsRequest = {
      origin: this.busStops[0].position, // Replace with your start coordinates
      destination: this.busStops[1].position, // Replace with your destination coordinates
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      this.zone.run(() => {
        if (status === google.maps.DirectionsStatus.OK) {
          // this.directionsRenderer.setDirections(result);
          this.directionsResults = result;
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    });
  }

  // Add to landing component
  searchForm = new FormGroup({
    search: new FormControl('')
  })

  handleSearch() {
    if (this.searchForm.controls['search'].value === '0001') {

      this.busStops = [
        {
          title: 'Randburg',
          position: { lat: -26.1, lng: 28.0 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
        {
          title: 'Johannesburg',
          position: { lat: -26.2, lng: 28.1 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
      ],

        this.alternativeStops = [
          {
            title: 'Stop 1',
            position: { lat: -26.14906, lng: 28.009492 },
            // icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
          },
          {
            title: 'Stop 2',
            position: { lat: -26.182785, lng: 28.017755 },
            // icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
          },
          {
            title: 'Stop 3',
            position: { lat: -26.201923, lng: 28.03123 },
            // icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
          },
        ];
      this.calculateAndDisplayRoute();
    }

    if (this.searchForm.controls['search'].value === '0002') {
      this.busStops = [
        {
          title: 'Randburg',
          position: { lat: -26.1, lng: 28.0 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
        {
          title: 'Sandton',
          position: { lat: -26.1086844, lng: 28.0582833 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
      ],

        this.alternativeStops = [
          {
            title: 'Stop 1',
            position: { lat: -26.090532, lng: 28.026145 },

          },
          {
            title: 'Stop 2',
            position: { lat: -26.10192, lng: 28.040242 }
          },
          {
            title: 'Stop 3',
            position: { lat: -26.091321, lng: 28.023776 }
          },
        ],

        this.calculateAndDisplayRoute();
    }

    if (this.searchForm.controls['search'].value === '0003') {
      this.busStops = [
        {
          title: 'Sandton',
          position: { lat: -26.1086844, lng: 28.0582833 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
        {
          title: 'Edenvale',
          position: { lat: -26.1183893, lng: 28.1410332 },
          icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
        },
      ],

        this.alternativeStops = [
          {
            title: 'Stop 1',
            position: { lat: -26.091033, lng: 28.081613 },

          },
          {
            title: 'Stop 2',
            position: { lat: -26.097373, lng: 28.080604 },

          },
          {
            title: 'Stop 3',
            position: { lat: -26.082537, lng: 28.105974 },

          },
        ],

        this.calculateAndDisplayRoute();
    }

  }
 
}
