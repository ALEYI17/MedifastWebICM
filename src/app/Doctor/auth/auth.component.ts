import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/Service/doctor.service';
import { Doctor } from 'src/app/entities/doctor';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSubmitted: boolean = false;

  clienteForm! :FormGroup;

  uid:string = "";

  constructor(private doctorservice: DoctorService , private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.clienteForm = this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      contrasena:['',Validators.required],
      Eps:['',Validators.required],
      especialidad:['',Validators.required]
    });
  }

  ngOnInit() {}

  OnSubmit() {

    this.isSubmitted = true;
    if(this.clienteForm.valid){
      const clienteData = this.clienteForm.value;

      const doctor:Doctor={
        apellido:clienteData.apellido,
        contrasena:clienteData.contrasena,
        correo:clienteData.correo,
        nombre:clienteData.nombre,
        especialidad:clienteData.especialidad,
        Eps:clienteData.Eps,
      } 

      console.log(doctor);

       this.doctorservice.registrarDoctor(doctor.correo,doctor.contrasena)
      .then(Response=> {
        this.uid = Response.user.uid;
        console.log(this.uid);
        console.log(Response)
        this.clienteForm.reset();
        this.doctorservice.guaradrDoctor(doctor, this.uid)
      .then(Res=>{
        console.log(Res)
        this.snackBar.open('Doctor guardado correctamente', 'Close', {
          duration: 3000,
          panelClass: ['success-toast'],
        });
      }).catch(error=>{
        console.log(error)
        this.snackBar.open('Error al guardar el doctor', 'Close', {
          duration: 3000,
          panelClass: ['error-toast'],
        });
      })
        this.snackBar.open("Añadido", 'Close', {
          duration: 3000,
          panelClass: ['error-toast'],
        });
      }
      
      ).catch(error=> {
        console.log(error)
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          panelClass: ['error-toast'],
        });
      }
      );

      

      
      
      
    }
    else{
      console.log("no es valido");
      this.snackBar.open("LLena todos los campos", 'Close', {
        duration: 3000,
        panelClass: ['error-toast'],
      });
      
    }
    
    

 

    // Puedes enviar la información al servicio de DoctorService para su procesamiento
    // this.doctor.registrarDoctor(form.value);
  }
}
