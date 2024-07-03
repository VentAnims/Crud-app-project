import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
    //JS code goes below

    fun() {
      console.log("test");
    }

    //Function for making new <a>
    
    createElement(Element:any, Processed:any, AgeCalc:boolean) {
      var elem = document.createElement('a');
      elem.style.padding = '0px 0 0 15px';
      elem.textContent = Processed;
      if(AgeCalc) {
        calcAge(elem);
      }
      Element.appendChild(elem);
    }
    createButton(Element:any, textContent:string, deleter:boolean, elemId:any, pData:any) {
      var ElementButton = document.createElement('button');

      ElementButton.style.float = 'right';
      ElementButton.style.marginRight = '16px';
      ElementButton.style.background = '#ddba8b';
      ElementButton.style.border = 'none';
      ElementButton.style.cursor = 'pointer';
      ElementButton.style.padding = '13px';
      ElementButton.style.marginTop = '-10px';
      ElementButton.style.position = 'relative';
      ElementButton.textContent = textContent;
      ElementButton.addEventListener('click', () => {if(deleter) {this.deleteElement(elemId); Element.remove();} else (this.goToEdit(pData))});
      Element.appendChild(ElementButton);
    }
    goToEdit(processedData:any) {
      sessionStorage.setItem("fName", processedData.firstName);
      sessionStorage.setItem("lName", processedData.lastName);
      sessionStorage.setItem("prof", processedData.profession);
      sessionStorage.setItem("age", processedData.age);
      sessionStorage.setItem("gender", processedData.gender);
      this.navigate('edit');
    }
    deleteElement(elemId:any) {
      let Elements = JSON.parse(sessionStorage.getItem('Elements')!);
      Elements.splice(elemId, 1);
      sessionStorage.setItem('Elements', JSON.stringify(Elements));
    }
    styleMain(Element:any) {
      Element.className = 'element';
      Element.style.position = 'relative';
      Element.style.backgroundColor = '#fae8b6';
      Element.style.padding = '10px';
      Element.style.marginTop = '6px';
      Element.style.marginBottom = '5px';
      Element.style.border = 'solid #D5BA71';
      Element.style.borderRadius = '6px';
    }
    addPerson(elementDataNumb:any, elemId:any) {
      let dDataProcessed = elementDataNumb;
      var dElement = document.createElement('div');
      this.styleMain(dElement);
      this.createElement(dElement, dDataProcessed.firstName, false);
      this.createElement(dElement, dDataProcessed.lastName, false);
      this.createElement(dElement, dDataProcessed.profession, false);
      this.createElement(dElement, dDataProcessed.age, true);
      this.createElement(dElement, dDataProcessed.gender, false);
      this.createButton(dElement, 'Delete', true, elemId, dDataProcessed);
      this.createButton(dElement, 'Edit', false, elemId, dDataProcessed);
      document.getElementsByClassName('contentBox')[0].appendChild(dElement);
    }
    
    public ngOnInit(): void {

      let Elements = JSON.parse(sessionStorage.getItem('Elements')!);
      for(let i=0; i < Elements.length; i++) {
        this.addPerson(JSON.parse(Elements[i]), i);
      }

    }

    //Setting up routes
  
    constructor(private router: Router) {}

    navigate(path:string) {
      let data = document.getElementsByClassName('element'); 
      sessionStorage.setItem('settings', String(data));
      this.router.navigate([path]);
    }
}

function calcAge(birthday:any) {

  var mD = Date.now() - new Date(String(birthday.textContent)).getTime();
  var dt = new Date(mD);
  var year = dt.getUTCFullYear();
  var Age = Math.abs(year - 1970)
  birthday.textContent = String(Age);

}
