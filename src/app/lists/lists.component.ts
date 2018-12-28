import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListsService } from '../services/lists.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  
  private createListForm:FormGroup;
  private createAList:boolean = false;
  private lists:any[];
  private sortedLists:any[];
  private editMode:boolean[];
  private retrievingData = true;
  private modalResponse:string="";

  constructor(public dialog: MatDialog, private tasksService: TasksService, private sb: SnackbarComponent, private fb: FormBuilder, private listsService: ListsService) {
    this.createListForm = this.fb.group({
      listName: ['', Validators.required ]
    });
   }

  ngOnInit() {
    this.getAllLists(); 
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
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

  modifyListName(name, id) {
    console.log("name: " + name + " id: " + id);
    const listUpdated = {
      name : name
    }
    this.modifyOneList(listUpdated,id);
  }

  deleteOneList(id:number, index:number) {
    this.tasksService.retrieveAllTasksOfAList(id)
    .subscribe(
      data => {
        if (data === null) {
          this.listsService.deleteList(id)
          .subscribe(() => this.lists.splice(index, 1))
        }
        else {
          const dialogRef = this.dialog.open(ModalComponent, {
            width: '250px',
            data: {modalResponse: this.modalResponse}
          });
      
          dialogRef.afterClosed().subscribe(wantToDelete => {
            if(wantToDelete) {
              this.tasksService.deleteAllTasksOfAList(id)
              .subscribe(
                data => {
                  this.listsService.deleteList(id)
                  .subscribe(() => this.lists.splice(index, 1))
                  
                }  
              )
            }
          });
        }
      }),
      (err) => {
        let snackBarRef = this.sb.openSnackBar('Error deleting the list :(', "Close");
      };
  }

  getAllLists() {
    this.listsService.retrieveAllLists()
   .subscribe(
      data => {
        var sortedLists = data.sort((obj1,obj2) => obj1.id - obj2.id)
        this.lists = sortedLists.map(list => [list.id, list.name, false])
        this.retrievingData = false;
      }
    )
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
