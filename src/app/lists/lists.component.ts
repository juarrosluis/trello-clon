import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListsService } from '../services/lists.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  
  private createListForm:FormGroup;
  private createAList:boolean = false;
  private lists:any[];
  private editMode:boolean[];
  artists = [
    'The One Thing: The surprisingly simple truth behind extraordinary results',
    'Artist II - Wizkid',
    'Artist III - Burna Boy',
    'Artist IV - Kiss Daniel',
    'Artist V - Mayorkun'
  ];

  constructor(private sb: SnackbarComponent, private fb: FormBuilder, private listsService: ListsService) {
    this.createListForm = this.fb.group({
      listName: ['', Validators.required ]
    });
   }

  ngOnInit() {
    this.getAllLists(); 
  }

  changeEditMode(index) {
    this.lists[index][2] = !this.lists[index][2];
    console.log("index: " + index + " status: " + this.lists[index][2]);
  }

  modifyOneList(data, id) {
    this.listsService.updateList(data, id).subscribe(
      res => this.getAllLists()
    );
  }
  deleteOneList(id:string) {
    this.listsService.deleteList(id).subscribe(
      res => this.getAllLists()
    );
  }
  getAllLists() {
    this.listsService.retrieveAllLists().subscribe(
      data => {
        this.lists = data.map(list => [list.id, list.name, false])
        console.log(this.lists[0])
      }
    );
  }

  wantToCreateAList(){
    this.createAList = true;
  }

  closeListCreation() {
    this.createAList = false;
  }

  onFormSubmit(form:FormGroup) {
    this.closeListCreation();
    const form_data = {
      "name" : form.controls['listName'].value
    }
    form.controls['listName'].setValue("");
    this.listsService.createList(form_data)
      .subscribe(res => {
        this.getAllLists()
      }, (err) => {
        console.log(err);
        let snackBarRef = this.sb.openSnackBar('Error creating the list :(', "Close");
      });
  }
}
