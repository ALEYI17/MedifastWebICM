import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { Database ,ref,set} from '@angular/fire/database';
import { Doctor } from '../entities/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private auth:Auth , private db:Database) { }

  registrarDoctor(correo:string , contra:string){

    return createUserWithEmailAndPassword(this.auth , correo,contra);
  }

  guaradrDoctor(Doctor:Doctor , uid:any){
    return  set(ref(this.db, 'doctores/' + uid), Doctor);
     
  }
}
