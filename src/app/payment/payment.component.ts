import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {  Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import {FileService} from '../upload/imageupload.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // constructor() { }

  // name = 'This is XLSX TO JSON CONVERTER';
  // willDownload = false;

  // constructor() { }

  // onFileChange(ev) {
  //   let workBook = null;
  //   let jsonData = null;
  //   const reader = new FileReader();
  //   const file = ev.target.files[0];
  //   reader.onload = (event) => {
  //     const data = reader.result;
  //     workBook = XLSX.read(data, { type: 'binary' });
  //     jsonData = workBook.SheetNames.reduce((initial, name) => {
  //       const sheet = workBook.Sheets[name];
  //       initial[name] = XLSX.utils.sheet_to_json(sheet);
  //       return initial;
  //     }, {});
  //     const dataString = JSON.stringify(jsonData);
  //     document.getElementById('output').innerHTML = dataString;
  //     this.setDownload(dataString);
  //   }
  //   reader.readAsBinaryString(file);
  // }


  // setDownload(data) {
  //   this.willDownload = true;
  //   setTimeout(() => {
  //     const el = document.querySelector("#download");
  //     el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
  //     el.setAttribute("download", 'xlsxtojson.json');
  //   }, 1000)
  // }
  
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  constructor( @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { }
  ngOnInit() {
    this.fileService.getImageDetailList();
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  save() {
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }
  view(){
    this.fileService.getImage(this.file);
  }
}
