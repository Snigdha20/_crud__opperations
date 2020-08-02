import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(["/dashboard"]);

      } else {
        localStorage.setItem('user', null);
        this.router.navigate(["/"]);

      }
    })

  }
  
  
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(["/dashboard"]);
        console.log("You have been successfully logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
  }


//   async login(email: string, password: string) {
//     var result = await this.afAuth.signInWithEmailAndPassword(email, password)
//     this.router.navigate(['admin/list']);
// }
  

  // async register(email: string, password: string) {
  //   var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  //   this.sendEmailVerification();
  // }

//   async sendEmailVerification() {
//     await (await this.afAuth.currentUser).sendEmailVerification()
//     this.router.navigate(['admin/verify-email']);
// }

// async sendPasswordResetEmail(passwordResetEmail: string) {
//   return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
// }

async logout(){
  await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['admin/login']);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
async  loginWithGoogle(){
  await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  this.router.navigate(['admin/list']);
}

get authEmail(): string {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.email;
}
get authUser(): User {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  return user;
}
get authName(): string {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.displayName;
}

}





