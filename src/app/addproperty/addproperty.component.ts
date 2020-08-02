import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PropertyService } from '../property/property.service';
import { Router } from '@angular/router';
import {Upload} from '../upload/upload';
import {UploadService} from '../upload/upload.service';
import { finalize } from "rxjs/operators";
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})

export class AddpropertyComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Upload;
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  progress: { percentage: number } = { percentage: 0 };

  constructor(public propertService:PropertyService,private router:Router,public uploadservice:UploadService,private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  
  createProperty(formData:NgForm){
    console.log(formData);
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    // this.propertService.create(formData).then(
    //   res=>{
    //     formData.reset();
    //     
    //   }
    // )
    
    
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.propertService.insertImageDetails(this.url,formData);
          alert('Upload Successful');
          this.router.navigate(['/dashboard']);
        })
      })
    ).subscribe();
    
  }
  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  // save() {
  //   var name = this.selectedImage.name;
  //   const fileRef = this.storage.ref(name);
  //   this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.url = url;
  //         this.propertService.insertImageDetails(this.url);
  //         alert('Upload Successful');
  //       })
  //     })
  //   ).subscribe();
  // }
 
  
}
// upload() {
//   const file = this.selectedFiles.item(0);
//   this.selectedFiles = undefined;

//   this.currentFileUpload = new Upload(file);
//   this.uploadservice.pushFileToStorage(this.currentFileUpload, this.progress);
// }


// var details={propertyName:String,
    // location:String,
    // rent:String,
    // leasetime:String}
    
    // propertyName=formData.value.pname;
    // var location=formData.value.location;
    // var rent=formData.value.rent;
    // var leasetime=formData.value.leasetime;
    // onSubmit(value){
    //   this.firebaseService.createUser(value, this.avatarLink)
    //   .then(
    //     res => {
    //       this.resetFields();
    //       this.router.navigate(['/home']);
    //     }
    //   )
    // }
