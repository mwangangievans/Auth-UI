import { Component } from '@angular/core';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  imports: [NgIf]

})
export class RegisterFormComponent {

  activetab : 1|2|3|4|5|6 = 1

  updateActiveTab(position:1|2|3|4|5|6){

    console.log({position});
    
    this.activetab = position

  }

}
