import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Output() urls = new EventEmitter();
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open<DialogComponent, number, {event: string, data:Promise<string[]>}>(DialogComponent, { width: '50%', height: '50%' });
    dialogRef.afterClosed().subscribe(evt => {
      console.log('Dialog closed');
      console.log(evt);
      if (evt && evt.data) {
        evt.data.then(urls => {
          console.log(urls);
          this.urls.emit(urls);
        });
      }
      
    })
  }
}
