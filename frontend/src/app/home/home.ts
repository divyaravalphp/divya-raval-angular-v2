import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  name: string = 'Divya Raval'; 
  designation: string = 'PHP Laravel Developer';
  imagePath: string = 'photo.png';
  tagline: string ='Senior PHP/Laravel Developer/Codeigniter/cakePHP/Core PHP (7+ Yrs) | Backend Systems & REST APIs | MySQL & Payment Gateway Integration ';

}
