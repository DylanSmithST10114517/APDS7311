import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  

  ngOnInit() {
    this.http.get('https://localhost:3000/test')
    .subscribe(data => {
      console.log(data)
    });
  }
}
