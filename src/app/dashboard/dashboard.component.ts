import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { PropertyService } from '../property/property.service';
// import {MatCardModule} from '@angular/material/card';
import { UploadService } from '../upload/upload.service';
import { Upload } from '../upload/upload';
import {FileService} from '../upload/imageupload.service';
import {AngularFireObject} from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/database';
// import 'rxjs/Rx';

interface photourl {
  imageurl?:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  details: any[] = [];
  fileUploads: any[];
  images:any[];
 featuredPhotoStream : AngularFireObject<photourl>;
  constructor(public router: Router, public authService: AuthService, public propertyservice: PropertyService,public db:AngularFireDatabase ) {
    var owner=this.authService.authUser;
    this.featuredPhotoStream=this.db.object("owner/"+owner.uid+"/property");
    console.log(this.featuredPhotoStream);
   }

  ngOnInit(): void {
    this.propertyservice.getAll().snapshotChanges().subscribe(res => {
      res.forEach(data => {
        this.details.push(data);

      });
     
    });
   
    // this.uploadservice.getFileUploads(6).snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
  //   changes.forEach(datas=>{
  // this.fileUploads.push(datas);
  //   });
    //  });
  }
  remove(propertyid): void
  {
    console.log(propertyid);
    this.propertyservice.delete(propertyid);
    this.details=[];
  }

}


  
 


