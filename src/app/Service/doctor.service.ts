import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private auth:Auth) { }

  registrarDoctor(correo:string , contra:string){

    return createUserWithEmailAndPassword(this.auth , correo,contra);
  }
}
