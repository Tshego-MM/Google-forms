import { Component } from "@angular/core";
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
export default class HomePage {
  constructor (public dialog: MatDialog) {}

  onOpenBuildFormDialog () {
    this.dialog.open(BuildFormDialog)
  }
}