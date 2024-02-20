import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {

} from "../../variables/charts";
import { Formateur } from 'src/app/Models/Formateur';
import { formateurService } from 'src/app/Services/formateur.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/Models/Response';
import { Question } from 'src/app/Models/Question';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  responses: Response[] = [];  // Ajoutez cette propriété pour stocker les réponses

  formateurs!: Formateur[]
  formateur: Formateur = new Formateur();
  question: Question = new Question();
  showModalQuestion: boolean = false;
  selectedResponseId: number;

  isUpdate:boolean=false;
  notification!: string ; // Ajout de la variable pour stocker la notification
  searchValue: string = ''; // Add this line recherche
  constructor(private formateurservice: formateurService,private router: Router) { }
  showModal = false;
  showModalResponse: boolean = false;

  response: Response = new Response();


  ngOnInit() {
    this.formateurservice.getAllFormateurs().subscribe(
      (data: Formateur[]) => {
        this.formateurs = data;
      }
    );
  
// Récupérez la liste des réponses depuis le service
this.formateurservice.getAllResponses().subscribe(
  (data: Response[]) => {
    this.responses = data;
  }
);


    this.closePopupForUpdate()
    this.closePopupForCreate()
}


openPopupForCreate() {
  this.isUpdate=false
  this.showModal = true;
}

openPopupForUpdate(formateurtoupdate:any) {
  this.formateur=formateurtoupdate
  this.showModal = true;
  this.isUpdate=true;

}

closePopupForCreate() {
  this.showModal = false;
}

closePopupForUpdate() {
  this.showModal = false;
}


getAllFormateur(): void {
  this.formateurservice.getAllFormateurs()
    .subscribe(formateurs => this.formateurs = formateurs);
// location.reload(); //reload the page
 
  
}

public deleteFormateur(id: number) {
  console.log(id);
  if (confirm('Are you sure you want to delete this Store?')) {
    this.formateurservice.deleteFormateurs(id).subscribe(() => {
      console.log('Store deleted successfully!');
      this.getAllFormateur();
    });
  }
}
openAddFormateurModal() {
  // Code pour ouvrir la fenêtre modale
  this.isUpdate=false
  this.router.navigate(['']);
}


onSubmit() {
 

  this.formateurservice.addFormateur(this.formateur)
    .subscribe(formateur => {
     // console.log('Formation ajoutée avec succès: ', this.formation);
      // réinitialiser le formulaire après l'ajout de la formation
     this.formateur = new Formateur();
     this.getAllFormateur();
     
      this.notification = "Un nouveau formateur a été ajouté ou modifié";
      setTimeout(() => {
        this.notification = '';
      }, 6000);
      
    
    }, error => {
      console.error('Erreur lors de l\'ajout de la formation : ', error);
      if (error.status === 500) {
        alert("Veuillez Vérifier que tous les champs sont vrais");
      }
    });

  this.showModal = false;
}



// Dans votre composant (DashboardComponent)
openPopupForCreateResponse() {
  this.response = new Response(); // Réinitialiser la réponse
  this.showModalResponse = true; // Afficher la popup
}

closePopupForCreateResponse() {
  this.showModalResponse = false; // Masquer la popup
}

onSubmitResponse() {

  this.formateurservice.addReponse(this.response)
    .subscribe(response => {
     // console.log('Formation ajoutée avec succès: ', this.formation);
      // réinitialiser le formulaire après l'ajout de la formation
     this.response = new Response();
     
      this.notification = "Une  reponse a été ajouté";
      setTimeout(() => {
        this.notification = '';
      }, 6000);
      
    
    }, error => {
      console.error('Erreur lors de l\'ajout de la reponse : ', error);
      if (error.status === 500) {
        alert("Veuillez Vérifier que tous les champs sont vrais");
      }
    });

  this.showModal = false;
}



onSubmitQuestion() {
  // Assurez-vous que this.selectedResponseId est l'ID de la réponse sélectionnée
  this.question.correctAnswer = {
    id: this.selectedResponseId,
    response: '',  // Assurez-vous de fournir une valeur appropriée pour 'response'
};
  console.log('Question à envoyer depuis le composant:', this.question); 

  this.formateurservice.addQuestion(this.question)
  .subscribe(
    question => {
      console.log('Question ajoutée avec succès:', question);
      // ...
    },
    error => {
      console.error('Erreur lors de l\'ajout de la question : ', error);
      console.log('Contenu de la réponse d\'erreur : ', error.error);
      if (error.status === 500) {
        alert("Veuillez vérifier que tous les champs sont vrais");
      }
    }  
  );

  this.showModal = false;
}


openPopupForCreateQuestion() {
  this.question = new Question(); // Réinitialiser la question
  this.showModalQuestion = true; // Afficher la popup
}

closePopupForCreateQuestion() {
  this.showModalQuestion = false; // Masquer la popup
}

}
