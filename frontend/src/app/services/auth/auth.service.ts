import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  register(email: string, password: string): void {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  login(email: string, password: string): void {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  logout(): void {
    this.firebaseAuth.signOut()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
