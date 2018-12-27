import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private createTaskForm:FormGroup;
  private offerToCreateATask:boolean = true;
  private createATask:boolean = false;
  private tasks:any[];
  private retrievingData = true;

  artists = [
    'The One Thing: The surprisingly simple truth behind extraordinary results',
    'Artist II - Wizkid',
    'Artist III - Burna Boy',
    'Artist IV - Kiss Daniel',
    'Artist V - Mayorkun'
  ];

  @Input() public listID:number;

  constructor(private sb: SnackbarComponent, private fb: FormBuilder, private tasksService: TasksService) { 
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required ]
    });
  }

  deleteTask(taskID,listID) {
    this.tasksService.deleteTask(taskID)
    .subscribe(res => {
      console.log(listID)
      this.tasksService.retrieveAllTasksOfAList(listID)
      .subscribe(data => this.tasks = data)
    }, (err) => {
      console.log(err);
      let snackBarRef = this.sb.openSnackBar('Error deleteting the card :(', "Close");
    });
  }

  ngOnInit() {
    this.getAllTasks(this.listID);
  }

  wantToCreateATask(){
    this.createATask = true;
  }

  closeTaskCreation() {
    this.createATask = false;
  }

  onFormSubmit(form:FormGroup) {
    this.closeTaskCreation();
    const form_data = {
      "idlist" : this.listID,
      "task" : form.controls['taskName'].value
    }
    form.controls['taskName'].setValue("");
    this.tasksService.createTaskOnAList(form_data)
      .subscribe(res => {
        this.getAllTasks(this.listID)
      }, (err) => {
        console.log(err);
        let snackBarRef = this.sb.openSnackBar('Error creating the card :(', "Close");
      });
  }

  getAllTasks(id) {
    this.tasksService.retrieveAllTasksOfAList(id)
   .subscribe(
      data => {
        //var sortedTasks = data.sort((obj1,obj2) => obj1.id - obj2.id)
        //this.tasks = sortedTasks.map(list => [list.id, list.name, false])
        this.tasks = data;
        console.log(data);
        this.retrievingData = false;
      }
    );
  }

}
