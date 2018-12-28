import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
        if(data != null) {
          var sortedTasks = data.sort((obj1,obj2) => obj1.id - obj2.id)
          this.tasks = sortedTasks.map(task => [task.id, task.task, task.idlist, false])
        }
        this.retrievingData = false;
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  modifyTaskName(name, idTask, idList) {
    const taskUpdated = {
      task : name
    }
    this.modifyOneTask(taskUpdated,idTask, idList);
  }

  modifyOneTask(data, idTask, idList) {
    this.tasksService.updateTask(data, idTask).subscribe(
      res => this.getAllTasks(idList)
    );
  }

  changeEditMode(index) {
    this.tasks[index][3] = !this.tasks[index][3];
    console.log("index: " + index + " status: " + this.tasks[index][3]);
  }

}
