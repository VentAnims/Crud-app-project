import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-tab',
  standalone: true,
  imports: [],
  templateUrl: './edit-tab.component.html',
  styleUrl: './edit-tab.component.scss'
})
export class EditTabComponent {

  FNAME = sessionStorage.getItem("fName");
  LNAME = sessionStorage.getItem("lName")
  PROF = sessionStorage.getItem("prof");
  AGE = sessionStorage.getItem("age");
  GENDER = sessionStorage.getItem("gender");

  selectFunc() {
    const dropdown = document.querySelector('.dropdown')!;
    const select = dropdown.querySelector('.select')!;
    const caret = dropdown.querySelector('.caret')!;
    const menu = dropdown.querySelector('.menu')!;
    select.classList.toggle('select=clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  }
  optionFunc(option:any) {
    const optionElement = document.getElementsByName(option)[0];
    const dropdown = document.querySelector('.dropdown')!;
    const selected = dropdown.querySelector('.selected')!;
    const select = dropdown.querySelector('.select')!;
    const caret = dropdown.querySelector('.caret')!;
    const menu = dropdown.querySelector('.menu')!;
    selected.textContent = option;
    this.GENDER = option;
    select.classList.remove('select-clicked');
    caret.classList.remove('caret-rotate');
    menu.classList.remove('menu-open');
  }

  ID = 0;

  constructor(private router: Router) {}
  back(path:string) {
    this.router.navigate([path]);
  }

  onKey(event:any, elemType:string) {
    var inputValue = event.target.value;
    sessionStorage.setItem(elemType, inputValue);
  }

  validateForm() {
    let x = sessionStorage.getItem('fName');
    let y = sessionStorage.getItem('lName');
    let z = sessionStorage.getItem('prof');
    let l = (<HTMLSelectElement>document.getElementById('gender'))?.value
    let i = (<HTMLInputElement>document.getElementById('age'))?.value
    let regex = /^[a-zA-Z]+$/;

    if(x == "" || !regex.test(x!) || Number(x?.length) > 12 || z == "" || !regex.test(z!)  
      || Number(z?.length) > 26 || y == "" || !regex.test(y!) || Number(y?.length) > 12 || l == "" || i == "") {
      return false;
    } else {
      return true;
    } 
  }

  public ngOnInit(): void {
    document.getElementsByClassName('selected')[0].textContent = this.GENDER;

    let Elements = JSON.parse(sessionStorage.getItem('Elements')!);

    for(let i=0; i<Elements.length; i++) {
      if(JSON.parse(Elements[i]).firstName == this.FNAME) {
        this.ID = i;
      }
    }

    if(this.GENDER != "Male") {
      if(this.GENDER != "Female") {
        this.GENDER = "Other";
      }
    } else {

    }
  }

  public addElement() {
    if(!this.validateForm()) {
      if(document.getElementById("errorMessage") == null) {
        var p = document.createElement('p');
        p.textContent = "Please enter valid information";
        p.style.color = "red";
        p.id = "errorMessage"
        document.getElementsByName("Form")[0]?.append(p);
      }
    } else {
      let Elements = JSON.parse(sessionStorage.getItem('Elements')!);

      Elements.splice(this.ID, 1);

      let ElementData = {
        firstName: sessionStorage.getItem('fName'),
        lastName: sessionStorage.getItem('lName'),
        profession: sessionStorage.getItem('prof'),
        age: (<HTMLInputElement>document.getElementById('age'))?.value,
        gender: this.GENDER,
      }
      Elements.push(JSON.stringify(ElementData));
      sessionStorage.setItem('Elements', JSON.stringify(Elements));

      this.back('');
    }
  }
}
