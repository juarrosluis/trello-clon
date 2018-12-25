import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  
  private createListForm:FormGroup;
  private createAList:boolean = false;
  artists = [
    'The One Thing: The surprisingly simple truth behind extraordinary results',
    'Artist II - Wizkid',
    'Artist III - Burna Boy',
    'Artist IV - Kiss Daniel',
    'Artist V - Mayorkun'
  ];

  constructor(private fb: FormBuilder, private listsService: ListsService) {
    this.createListForm = this.fb.group({
      listName: ['', Validators.required ]
    });
   }

  ngOnInit() {
    
  }

  wantToCreateAList(){
    this.createAList = true;
  }

  closeListCreation() {
    this.createAList = false;
  }

  onFormSubmit(form:FormGroup) {
    const form_data = {
      "name" : form.controls['listName'].value
    }

    this.listsService.createUser(form_data)
      .subscribe(res => {
        if(res === null) {
          console.log("res === null");
        }
        else {
          console.log("res != null"); 
        }
      }, (err) => {
        console.log(err);
      });
  }


}
