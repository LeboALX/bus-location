import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  shitfValue!: any;
  directionsResults: any;
  estimatedArrivalTime: string = '';

  private map!: google.maps.Map;
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;

  zoom: number = 15;
  center: any;

  ngOnInit(): void {
    
    this.handleSearch();
  }

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
  {
    title: 'Johannesburg',
    position: { lat: -26.2, lng: 28.1 },
  },
  {
    title: 'Stop 3',
    position: { lat: -26.201923, lng: 28.03123 },
  },
  {
    title: 'Stop 2',
    position: { lat: -26.182785, lng: 28.017755 },
  },
  {
    title: 'Stop 1',
    position: { lat: -26.14906, lng: 28.009492 },
  },
  {
    title: 'randburg',
    position: { lat: -26.099111550000003, lng: 28.002470214946314 },
  },
  {
    title: 'randburg',
    position: { lat: -26.099111550000003, lng: 28.002470214946314 },
  },
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
  {
    title: 'Sandton',
    position: { lat: -26.1086844, lng: 28.0582833 },
    icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
  },
  {
    title: 'Sandton',
    position: { lat: -26.1086844, lng: 28.0582833 },
    icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
  },
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
  {
    title: 'Edenvale',
    position: { lat: -26.1183893, lng: 28.1410332 },
    icon: '../../assets/images/bus-location-marker-icon_resized.jpeg',
  },
];

  constructor(private zone: NgZone, @Inject(MAT_DIALOG_DATA) public tripNo: any,
  private dialogRef: MatDialogRef<TrackerComponent>) {
    this.shitfValue = tripNo.tripNo;
    this.getMyCurrentLocation();

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });

    // track bus, updates every 3 seconds
    // setInterval(() => {
    // this.getMyCurrentLocation();
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
    // Set up the interval
const intervalId = setInterval(() => {
  // Check if count is within the bounds of the movingBus array
  if (count < this.movingBus.length) {
    navigator.geolocation.getCurrentPosition(location => {
      this.center = {
        lat: this.movingBus[count].position.lat,
        lng: this.movingBus[count].position.lng
      }

      console.log('Bus Location : ', this.center)
      this.availableBuses[0].position = this.center;
      count++;

      // Check if count has reached the end of the movingBus array
      if (count === this.movingBus.length) {
        console.log('Reached the end of movingBus array');
        clearInterval(intervalId); // Clear the interval
      }
    });
  } else {
    console.log('Interval cleared');
    clearInterval(intervalId); // Clear the interval
  }
}, 3000);

  }

  // adding the route from origin and destination
  calculateAndDisplayRoute() {
    for (let i = 0; i < this.availableBuses.length; i++) {
      const bus = this.availableBuses[i];
    const request: google.maps.DirectionsRequest = {
      origin: this.busStops[0].position, // Replace with your start coordinates
      destination: this.busStops[1].position, // Replace with your destination coordinates
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    };

    this.directionsService.route(request, (result, status) => {
      this.zone.run(() => {
        if (status === google.maps.DirectionsStatus.OK) {
          // this.directionsRenderer.setDirections(result);
          this.directionsResults = result;
          const duration = this.directionsResults.routes[0].legs[0].duration.text;
          this.estimatedArrivalTime = this.calculateETA(duration);

          // Store the estimated arrival time for the current bus
          bus.estimatedArrivalTime = this.estimatedArrivalTime;

          // Display the estimated arrival time for the current bus
          console.log(`Estimated arrival time for ${bus.title}: ${this.estimatedArrivalTime}`);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    });
  }

}

  calculateETA(duration: string): string {
    // duration is in the format 'X hours Y mins' or 'Y mins' - google mpas format
    // split duration into an array of items
    const parts = duration.split(' ');

    let totalMins = 0;
  
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.includes('hour')) {
        totalMins += parseInt(parts[i - 1]) * 60;
      } else if (part.includes('min')) {
        totalMins += parseInt(parts[i - 1]);
      }
    }
  
    // Adjust for any additional stops or delays
    const adjustedMins = totalMins + 10; // You can adjust this as needed
  
    const arrivalDate = new Date();
    arrivalDate.setTime(arrivalDate.getTime() + adjustedMins * 60 * 1000); // Convert minutes to milliseconds

    
  
    // Format the arrival time
    const hours = arrivalDate.getHours();
    const minutes = arrivalDate.getMinutes();
  
    const formattedArrivalTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    return formattedArrivalTime;
  }
  

  handleSearch() {
    if (this.shitfValue === '0001') {

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

    if (this.shitfValue === '0002') {
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

    if (this.shitfValue === '0003') {
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

  close(): void {
    this.dialogRef.close()
  }

}
