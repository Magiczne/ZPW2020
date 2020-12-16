import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { UserInfo } from '../../_types/user';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private collection = 'users';

  userRaw: firebase.User | null;

  userInfo$: Observable<DocumentSnapshot<UserInfo>>;
  userInfo: UserInfo;

  constructor(private firestore: AngularFirestore, private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.user.subscribe(user => {
      this.userRaw = user;

      if (this.userRaw) {
        this.userInfo$ = this.firestore.doc<UserInfo>(`${this.collection}/${this.userRaw.uid}`).get();
        this.userInfo$.subscribe(data => {
          this.userInfo = data.data();
        });
      }
    });
  }

  get user(): Observable<firebase.User> {
    return this.firebaseAuth.user;
  }

  get isAdmin(): boolean {
    return this.userInfo && this.userInfo.roles.includes('admin');
  }

  async register(email: string, password: string): Promise<void> {
    const credentials = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);

    await this.firestore.collection<UserInfo>(this.collection)
      .doc(credentials.user.uid)
      .set({ roles: [] });
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.firebaseAuth.signOut();
  }
}
