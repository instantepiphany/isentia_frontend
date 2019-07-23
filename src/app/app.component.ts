import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  title = 'FlickrViewer';
  searchQuery: string = '';
  flickrData: any;


  constructor(
    private http: HttpClient
  ) {
  }

	ngOnInit() {
    this.http.get("http://127.0.0.1:3000/public")
      .subscribe((data) => this.flickrData = data);
  }

  searchTags() {
    this.http.get(`http://127.0.0.1:3000/public?tags=${this.searchQuery}`)
      .subscribe((data) => this.flickrData = data);
  }
}

