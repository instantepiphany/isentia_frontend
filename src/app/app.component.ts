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
  tags: Subject<string>;
  imageObjects: any;
  flickrData: any;


	constructor(
		private http: HttpClient
	) {
    this.tags = new Subject();
  }

	ngOnInit() {
    this.http.get("http://127.0.0.1:3000/public")
      .subscribe((data) => this.flickrData = data);
    this.tags.asObservable().pipe(debounceTime(800))
      .subscribe((tags) => {
      this.http.get(`http://127.0.0.1:3000/public?tags=${tags}`)
        .subscribe((data) => this.flickrData = data);
    });
  }

  tagsKeyUp(tags: string) {
    this.tags.next(tags);
  }
}

