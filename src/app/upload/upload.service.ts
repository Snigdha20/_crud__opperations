import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Upload} from './upload';
import {AuthService} from '../auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor( private db:AngularFireDatabase,public authservice:AuthService) { };
  //  private basePath = '/uploads';
   private path;

 
  pushFileToStorage(fileUpload: Upload, progress: { percentage: number }) {
    var owner=this.authservice.authUser;
     this.path="owner/"+owner.uid+"/property";
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.path}/${fileUpload.file.name}`).put(fileUpload.file);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
    
 

  }
 
  private saveFileData(fileUpload: Upload) {
    var owner=this.authservice.authUser;
     this.path="owner/"+owner.uid+"/property";
    this.db.list(`${this.path}/`).push(fileUpload);
  }
 
  getFileUploads(numberItems): AngularFireList<Upload> {
    var owner=this.authservice.authUser;
    return this.db.list('owner/'+owner.uid+'/property', ref =>
      ref.limitToLast(numberItems));
  }
 
  deleteFileUpload(fileUpload: Upload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
 
  private deleteFileDatabase(key: string) {
    var owner=this.authservice.authUser;
     this.path="owner/"+owner.uid+"/property";
    return this.db.list(`${this.path}/`).remove(key);
  }
 
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    var owner=this.authservice.authUser;
     this.path="owner/"+owner.uid+"/property";
    storageRef.child(`${this.path}/${name}`).delete();
  }
  
}

