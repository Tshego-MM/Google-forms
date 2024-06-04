import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";
import BuildFormDialog from "@/components/dialog/build-form/build-form.dialog.component";

@Component({
  imports: [
    FooterComponent,
    HeaderComponent,
  ],
  selector: 'app-home-page',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export default class HomePage implements OnInit {
  
  constructor (public dialog: MatDialog) {}

  onOpenBuildFormDialog () {
    this.dialog.open(BuildFormDialog)
  }
  loggedIn=false;
  async ngOnInit():Promise<void>{
    const url=window.location.href;
    if(url.includes("token")){
      const regex = /id_token=([^&]*)/;
      const match = url.match(regex);
      const jwt= match ? match[1] : null; //this jwt needs to be saved somewhere and added to all api requests in the autorization header with the word Bearer before hand
      
      const verification=await fetch("http://localhost:3000/api/users/testJWT", { //this url needs to be abstracted better
        method: "GET",
        headers:{
          'Authorization': `Bearer ${jwt}`
        }
      })
      if(verification.status===200){
        this.loggedIn=true;

      }else{
        this.loggedIn=false;
      }
    }
   
  }
  async login(){
    const data=await fetch("http://localhost:3000/api/login") //this url need to be abstracted better
    const body=await data.json()
    document.location.href=body.url
  }
  logout(){
    this.loggedIn=false;
    //delete the jwt 
  }
}