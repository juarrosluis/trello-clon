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
    'Artist I - Davido',
    'Artist II - Wizkid',
    'Artist III - Burna Boy',
    'Artist IV - Kiss Daniel',
    'Artist V - Mayorkun'
  ];

  constructor(private fb: FormBuilder, private usersService: ListsService) {
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
      "listName" : form.controls['listName'].value
    }

    /*this.listsService.retrieveUser(form_data)
      .subscribe(res => {
        if(res === null) {
          this.errorMessage = "There was an error trying to log in."
        }
        else {
          this.setSession(res);
          this.router.navigate(['/dashboard']);
        }
      }, (err) => {
        console.log(err);
        this.errorMessage = "There was an error trying to log in."
      });*/
  }


}
