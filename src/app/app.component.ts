import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBnZ1lXDe3aub6yDwYadmFgH7uOe34o0yU',
      authDomain: 'recipewebsite-6785e.firebaseapp.com',
      databaseURL: 'https://recipewebsite-6785e.firebaseio.com',
      projectId: 'recipewebsite-6785e',
      storageBucket: 'recipewebsite-6785e.appspot.com',
      messagingSenderId: '1002499312237'
    };
    firebase.initializeApp(config);
  }
}
