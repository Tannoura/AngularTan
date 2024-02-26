import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/Models/Session';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/Services/session.service';
import { Formation } from 'src/app/Models/Formation';
import { Organisme } from 'src/app/Models/Organisme';
import { FormationService } from 'src/app/Services/formation.service';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { User } from 'src/app/Models/User';
import { HttpClient } from '@angular/common/http';
import { PresenceService } from 'src/app/Services/presence.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Quiz } from 'src/app/Models/Quiz';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  selectedSessionQuizzes: Quiz[] = [];
  isQuizzesPopupVisible: boolean = false;
  sessions!: Session[]
  session: Session = new Session();
  isUpdate:boolean=false;
  notification!: string ; // Ajout de la variable pour stocker la notification
  searchValue: string = ''; // Add this line recherche
  constructor( private http: HttpClient,private authService:AuthService,private presenceService : PresenceService,private sessionService: SessionsService,private formationService:FormationService,private organismeService:OrganismeService,private router: Router) { }
  showModal = false;
  selectedSessionUsers: User[] = [];
  isUserPopupVisible: boolean = false;
  selectedSessionId:number;

  
  isPresenceManagementPopupVisible: boolean = false;

  showAffecterPopup = false;
  selectedFormation: number ;

  formations: Formation[];
  organismes: Organisme[];
 



  ngOnInit() {
    this.sessionService.getSessions().subscribe(
      (data: Session[]) => {
        this.sessions = data;
      }
    );
  
    this.loadFormationsAndOrganismes();
    this.closePopupForUpdate()
    this.closePopupForCreate()
}

loadFormationsAndOrganismes(): void {
  this.formationService.getAllFormations().subscribe(
    (data: Formation[]) => {
      this.formations = data;
    }
  );

   // Vérifiez si l'utilisateur a le rôle ADMIN
   if (!this.authService.isAdmin()) {
    // Redirigez l'utilisateur vers une autre page s'il n'a pas le rôle ADMIN
    this.router.navigate(['/user-profile']); // Remplacez '/autre-page' par le chemin de la page de redirection
  }
 
}

showQuizzesForSession(sessionId: number): void {
  this.sessionService.getQuizzesBySession(sessionId).subscribe(
    (quizzes: Quiz[]) => {
      console.log('Quizs associés à la session : ', quizzes);
      this.selectedSessionQuizzes = quizzes;
      this.isQuizzesPopupVisible = true;
    },
    (error) => {
      console.error('Erreur lors de la récupération des quizs associés à la session : ', error);
    }
  );
}

closeQuizzesPopup(): void {
  this.isQuizzesPopupVisible = false;
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
            if (error.status === 400) {
              // Gérer le cas où l'erreur est une erreur HTTP 404
              alert("'Verifier Date'");
              
            }
            alert("Veuillez Vérifier les datesde la session");

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



 // Nouvelle méthode pour afficher les utilisateurs liés à une session
 showUsersForSession(sessionId: number): void {
  // Appelez la fonction du service pour récupérer les utilisateurs liés à la session
  this.sessionService.getUsersBySession(sessionId).subscribe(
    (users: User[]) => {
      console.log('Utilisateurs liés à la session : ', users);
      this.selectedSessionUsers = users;
      this.isUserPopupVisible = true;
    },
    (error) => {
      console.error('Erreur lors de la récupération des utilisateurs liés à la session : ', error);
    }
  );
}

closeUserPopup(): void {
  this.isUserPopupVisible = false;
}


closePresenceManagementPopup(): void {
  this.isPresenceManagementPopupVisible = false; // Masquer la nouvelle popup
}

openPresenceManagementPopup(sessionId: number): void {
  this.selectedSessionId = sessionId;
  this.sessionService.getUsersBySession(sessionId).subscribe(
    (users: User[]) => {
      console.log('Utilisateurs liés à la session : ', users);
      this.selectedSessionUsers = users;
      this.isPresenceManagementPopupVisible = true; // Afficher la nouvelle popup
    },
    (error) => {
      console.error('Erreur lors de la récupération des utilisateurs liés à la session : ', error);
    }
  );
}

 // Méthode pour mettre à jour la présence de l'utilisateur et afficher une notification
 markPresence(userId: number, isPresent: boolean, sessionId: number): void {
  this.presenceService.markPresence(userId, sessionId, isPresent).subscribe(
    () => {
      const presenceStatus = isPresent ? 'présent' : 'absent';
      const message = `L'utilisateur ${userId} est ${presenceStatus} dans la session ${sessionId}.`;
      window.alert(message);
    },
    (error) => {
      console.error(`Erreur lors de la mise à jour de la présence de l'utilisateur ${userId} pour la session ${sessionId} : `, error);
      // Gérer l'erreur
    }
  );
}
  


}
  
