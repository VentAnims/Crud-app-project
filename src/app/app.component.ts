import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public ngOnInit() {
    let VElement = {
      firstName: 'Ventsislav',
      lastName: 'Kostadinov',
      profession: 'Designer',
      age: '2005-07-13', 
      gender: 'Male',
    };

    let MElement = {
      firstName: 'Markuss',
      lastName: 'Dinters',
      profession: 'Gamer',
      age: '2007-06-18', 
      gender: 'Other',
    }

    var Elements = [];
    Elements.push(JSON.stringify(MElement), JSON.stringify(VElement));
    sessionStorage.setItem('Elements', JSON.stringify(Elements));
  }

}