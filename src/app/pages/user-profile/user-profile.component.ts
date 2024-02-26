import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/Models/Formation';
import { Organisme } from 'src/app/Models/Organisme';
import { Quiz } from 'src/app/Models/Quiz';
import { Session } from 'src/app/Models/Session';
import { AuthService } from 'src/app/Services/auth.service';
import { FormationService } from 'src/app/Services/formation.service';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { SessionsService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  sessions!: Session[]
  session: Session = new Session();
  isUpdate:boolean=false;
  notification!: string ; // Ajout de la variable pour stocker la notification
  searchValue: string = ''; // Add this line recherche
  userId: number;
  quiz:Quiz = new Quiz();
  constructor(private quizservice:QuizService,private authService:AuthService,private sessionService: SessionsService,private formationService:FormationService,private organismeService:OrganismeService,private router: Router) { }
  showModal = false;

  
  // Nouvelles propriétés pour la gestion de l'affectation
  showAffecterPopup = false;
  selectedFormation: number ;
  username: string;

  formations: Formation[];
  organismes: Organisme[];
 
  showQuizPopup: boolean = false;
  newQuiz: Quiz = new Quiz();



  ngOnInit() {
    this.sessionService.getSessions().subscribe(
      (data: Session[]) => {
        this.sessions = data;
      }
    );
  
    this.loadFormationsAndOrganismes();
    this.closePopupForUpdate()
    this.closePopupForCreate()

    this.username = this.authService.username;

}

loadFormationsAndOrganismes(): void {
  this.formationService.getAllFormations().subscribe(
    (data: Formation[]) => {
      this.formations = data;
    }
  );
}

// Méthode pour ouvrir la pop-up du quiz
openQuizPopup() {
  // Réinitialisez les données du formulaire du quiz
  this.newQuiz = new Quiz();
  // Affichez la pop-up du quiz
  this.showQuizPopup = true;
}

// Méthode pour fermer la pop-up du quiz
closeQuizPopup() {
  // Masquez la pop-up du quiz
  this.showQuizPopup = false;
}


openPopupForCreate() {
  this.isUpdate=false
  this.showModal = true;

}

openPopupForUpdate(sessiontoupdate:any) {
  this.session=sessiontoupdate
  
  this.showModal = true;
  this.isUpdate=true;

}

closePopupForCreate() {
  this.showModal = false;
}

closePopupForUpdate() {
  this.showModal = false;
}


getAllSession(): void {
  this.sessionService.getSessions()
    .subscribe(sessions => this.sessions = sessions);
// location.reload(); //reload the page
 
  
}

public deleteSession(id: number) {
  console.log(id);
  if (confirm('Are you sure you want to delete this session?')) {
    this.sessionService.deleteSession(id).subscribe(() => {
      console.log('Store deleted successfully!');
      this.getAllSession();
    });
  }
}
openAddSessionModal() {
  // Code pour ouvrir la fenêtre modale
  this.isUpdate=false
  this.router.navigate(['']);
}



onSubmit() {
  // Vérifiez si la formation est associée à un organisme
  this.formationService.getOrganismeByFormationId(this.selectedFormation)
    .subscribe(organismes => {
      if (organismes && organismes.length > 0) {
        // La formation est associée à au moins un organisme, procédez à la création de la session
        this.sessionService.createSession(this.session, this.selectedFormation)
          .subscribe(createdSession => {
            // Réinitialiser le formulaire après l'ajout de la session
            this.session = new Session();

            // Fermez la popup d'ajout ou de mise à jour
            this.showModal = false;

            // Affichez une notification de succès
            this.notification = "Un nouveau session a été ajouté ou modifié";
            setTimeout(() => {
              this.notification = '';
            }, 6000);

            // Rafraîchissez la liste des sessions ou effectuez d'autres actions nécessaires
            this.getAllSession();
          }, error => {
            console.error('Erreur lors de la création de la session : ', error);
            if (error.status === 500) {
              alert("Une erreur s'est produite lors de la création de la session.");
            }
          });
      } else {
        // La formation n'est pas associée à un organisme, affichez un message d'erreur
        alert("Veuillez mettre cette formation dans un organisme d'abord.");
      }
    }, error => {
      console.error('Erreur lors de la récupération des organismes pour la formation : ', error);
      alert("Une erreur s'est produite lors de la récupération des organismes pour la formation.");
    });
}



loadFormations(): void {
  this.formationService.getAllFormations().subscribe(
    (data: Formation[]) => {
      this.formations = data;
    }
  );
}

getUserID(username: string) {
  this.sessionService.getUserIdByUsername(username).subscribe((userId: number) => {
    this.userId = userId;
    console.log('User ID:', this.userId);
  }, error => {
    console.error('Error:', error);
  });
}


affecterUsersToSession(username: string, idSession: number): void {
console.log(username)
  // Utilisez la méthode getUserID pour obtenir l'ID de l'utilisateur à partir du nom d'utilisateur
  this.sessionService.getUserIdByUsername(username)
    .subscribe((userId: number) => {
      // Utilisez l'ID de l'utilisateur pour appeler affecterUsersToSession
      this.sessionService.affecterUsersToSession(idSession, [userId])
        .subscribe(response => {
          console.log(response);
          // Faire quelque chose avec la réponse si nécessaire
        }, error => {

          console.error(error); // Gérer les erreurs si nécessaire
        });
    }, error => {
      console.error('Erreur lors de la récupération de l ID de l utilisateur:', error);
    });
}



// Méthode pour soumettre le formulaire du quiz
onSubmitQuiz() {
  // Appelez le service pour ajouter le quiz
  this.quizservice.addQuiz(this.newQuiz).subscribe(
    (quiz) => {
      console.log('Quiz ajouté avec succès: ', this.newQuiz);
      // Réinitialisez les données du formulaire du quiz après l'ajout
      this.newQuiz = new Quiz();
      // Fermez la pop-up du quiz
      this.showQuizPopup = false;
      // Affichez une notification de succès ou effectuez d'autres actions nécessaires
      this.notification = 'Un nouveau quiz a été ajouté avec succès';
    },
    (error) => {
      console.error('Erreur lors de l\'ajout du quiz : ', error);
      if (error.status === 500) {
        alert('Veuillez vérifier que tous les champs sont remplis correctement');
      }
    }
  );
}


// Fonction pour vérifier si la session est terminée
isSessionEnded(dateFin: Date): boolean {
  const currentDate = new Date();
  return currentDate.getTime() > new Date(dateFin).getTime();
}

}
