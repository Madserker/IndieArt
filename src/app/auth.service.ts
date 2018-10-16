import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


interface myData{
  success: boolean,
  message: string
}

@Injectable()
export class AuthService{
  
  constructor(private http : HttpClient){}
  
  getUserDetails(username,password){
    //post detalles al API server y retorna info de user si es correcto
    return this.http.post<myData>('/api/auth.php',{
      username,
      password
    })
  }
}