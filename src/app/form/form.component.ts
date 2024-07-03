import { Component, Input, input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  //Modal func
  openModal() {
    const modalDiv:any = document.getElementById("myModal")!;
    modalDiv.style.display = 'block';
  }
  closeModal() {
    const modalDiv:any = document.getElementById("myModal")!;
    modalDiv.style.display = 'none';
  }

  //Styling dropdown

  GENDER = null;

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

  //Pathing
  constructor(private router: Router) {}
  back(path:string) {
    this.router.navigate([path]);
  }

  //Input saving
  onKey(event:any, elemType:string) {
    var inputValue = event.target.value;
    sessionStorage.setItem(elemType, inputValue);
  }

  //Info validation
  validateForm() {
    let x = sessionStorage.getItem('fName');
    let y = sessionStorage.getItem('lName');
    let z = sessionStorage.getItem('prof');
    let l = this.GENDER;
    let i = (<HTMLInputElement>document.getElementById('age'))?.value
    let regex = /^[a-zA-Z]+$/;

    if(x == "" || !regex.test(x!) || Number(x?.length) > 12 || z == "" || !regex.test(z!)  
      || Number(z?.length) > 26 || y == "" || !regex.test(y!) || Number(y?.length) > 12 || l == null || i == "") {
      return false;
    } else {
      return true;
    } 
  }

  //Adding element to main
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
