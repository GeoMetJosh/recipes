/**
 * Created by Josh on 8/9/2017.
 */
import * as firebase from 'firebase';

export class AuthService {
  token: string;

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
            firebase.auth().currentUser.getToken()
              .then(
                (token: string) => this.token = token
              );
          }
      ).catch(
        error => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        response => {
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            );
          return this.token;
        });
  }
}
