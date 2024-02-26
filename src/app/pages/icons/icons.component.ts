import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/Models/Formateur';
import { Formation } from 'src/app/Models/Formation';
import { AuthService } from 'src/app/Services/auth.service';
import { formateurService } from 'src/app/Services/formateur.service';

import { FormationService } from 'src/app/Services/formation.service';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  formations!: Formation[]
  formation: Formation = new Formation();
  // Dans votre composant TypeScript

  isUpdate:boolean=false;
  notification!: string ; // Ajout de la variable pour stocker la notification
  searchValue: string = ''; // Add this line recherche
auth = this.authService;
  constructor(private authService: AuthService , private formationservice: FormationService,private router: Router) { }
  showModal = false;
 
  

  ngOnInit() {
    this.formationservice.getAllFormations().subscribe((data: Formation[]) => {
      console.log(data);
      this.formations = data; // initialisation de la variable formations avec les données du service
      

      

    });
    this.closePopupForUpdate()
    this.closePopupForCreate()

}
openPopupForCreate() {
  this.isUpdate=false
  this.showModal = true;
}

openPopupForUpdate(formationtoupdate:any) {
  this.formation=formationtoupdate
  this.showModal = true;
  this.isUpdate=true;

}

closePopupForCreate() {
  this.showModal = false;
}

closePopupForUpdate() {
  this.showModal = false;
}

getAllFormations(): void {
  this.formationservice.getAllFormations()
    .subscribe(formations => this.formations = formations);
  location.reload(); //reload the page
}

public deleteFormation(id: number) {
  console.log(id);
  if (confirm('Are you sure you want to delete this Facture?')) {
    this.formationservice.deleteFormations(id).subscribe(() => {
      console.log('for deleted successfully!');
      this.getAllFormations();
    });
  }
}


onSubmit() {
    this.formationservice.addFormation(this.formation).subscribe(
      (formation) => {
        console.log('Facture ajouté avec succès: ', this.formation);
        this.formation = new Formation();
        this.getAllFormations();
        this.notification = 'Une nouvelle Facture a été ajouté ou modifié';
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du Facture : ', error);
        if (error.status === 500) {
          alert('Veuillez Vérifier que tous les champs sont vrais');
        }
      }
    );

    this.showModal = false;
}




}
