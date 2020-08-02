import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

 
export class PropertyService {
  fileList: any[];
  private path;
  dataSet: Data = {
    id:'',
    url:''
  };

  constructor(public authservice:AuthService,public router:Router,public db:AngularFireDatabase) { }
  // create(property){
  

  // }

  delete(recordid):void
  {
    var owner= this.authservice.authUser;
    console.log(recordid);
    this.db.object('owner/'+owner.uid+'/property/'+recordid).remove();
   
  }

  getAll()
  {
    var owner=this.authservice.authUser;
    console.log(this.db.list("owner/"+owner.uid+"/property"));
    return this.db.list("owner/"+owner.uid+"/property") ;
  }
  insertImageDetails(url,property) {
    var owner=this.authservice.authUser;
      // return this.db.list("owner/"+owner.uid+"/property").push({url});
      var owner=this.authservice.authUser;
      console.log(owner);
      return this.db.list("owner/"+owner.uid+"/property").push(
       {
         tenantproperty:property.value.pname,
         location:property.value.location,
         rent:property.value.rent,
         leasetime:property.value.leasetime,
         imageurl:url
       }
       
     );
  }
}
export interface Data{
  id:string;
  url:string;
}