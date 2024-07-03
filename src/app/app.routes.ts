import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormComponent } from './form/form.component';
import { EditTabComponent } from './edit-tab/edit-tab.component';

export const routes: Routes = [
    //Add components here aka pages
    { path: '', component: MainComponent },
    { path: 'form', component: FormComponent },
    { path: 'edit', component: EditTabComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }