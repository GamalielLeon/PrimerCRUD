import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'CRUD';
  image: string = 'https://i.blogs.es/594843/chrome/450_1000.jpg';
  currentOption: number = 0;
  band: boolean = false;
  setOption(option: number, band: boolean): void{
    this.currentOption = option;
    this.band = band;
  }
}


