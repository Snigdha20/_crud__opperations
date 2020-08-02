import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import {AuthService} from '../auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class FileService {
  // imageDetailList: AngularFireList<any>;
  private path;
  fileList: any[];
  dataSet: Data = {
    id:'',
    url:''
  };
  msg:string = 'error';
  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase,public authservice:AuthService) { }
  getImageDetailList() {
    var owner =this.authservice.authUser;
    this.path='owner/'+owner.uid+'/property';
    this.path = this.firebase.list('path');
  }
  insertImageDetails(id,url) {
  
    this.dataSet = {
      id : id,
      url: url
    };
    this.path.push(this.dataSet);
  }
  getImage(value){
    var owner =this.authservice.authUser;
    this.path='owner/'+owner.uid+'/property';
    this.path.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val();  });
        this.fileList.forEach(element => {
          if(element.id===value)
          this.msg = element.url;
        });
        if(this.msg==='error')
          alert('No record found');
        else{
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
getImages()
 {
   return this.firebase.list('path');
 }
 }

export interface Data{
  id:string;
  url:string;
}