import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/Models/Formation';
import { Organisme } from 'src/app/Models/Organisme';
import { OrganismeService } from 'src/app/Services/organisme.service';
import { FormationService } from 'src/app/Services/formation.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  organismes!: Organisme[]
  organisme: Organisme = new Organisme();
  isUpdate: boolean = false;
  notification!: string; // Ajout de la variable pour stocker la notification
  searchValue: string = ''; // Ajout de la variable de recherche
  selectedFormations: number ;
  formations: Formation[] = []; // Liste des formations disponibles
  selectedFormationForUpdate: Formation ={id: null,
    titre: '',
    description: '',
    dureeEnHeures: 0,
    prix: 0,} ;
  showUpdateFormationModal = false;

  showUpdateAfterAdd: boolean = false;
  auth = this.authService;

  constructor(
    private authService: AuthService,
    private formationservice:FormationService,
    private organismeservice: OrganismeService,
    private formationService: FormationService, // Ajout du service FormationService
    private router: Router
  ) { }
  showModal = false;

  ngOnInit() {
    this.organismeservice.getAllOrganismes().subscribe(
      (data: Organisme[]) => {
        this.organismes = data;
      }
    );

    
    // Chargez la liste des formations
    this.loadFormations();

  }

  loadFormations() {
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data;
      }
    );
  }

  openPopupForCreate() {
    this.isUpdate = false;
    this.showModal = true;
  }

  openPopupForUpdate(organismeToUpdate: any) {
    this.organisme = organismeToUpdate;
    this.showModal = true;
    this.isUpdate = true;
  }

  closePopupForCreate() {
    this.showModal = false;
  }

  closePopupForUpdate() {
    this.showModal = false;
  }

  getAllOrganisme(): void {
    this.organismeservice.getAllOrganismes()
      .subscribe(organismes => this.organismes = organismes);
  }

  deleteOrganisme(id: number) {
    if (confirm('Are you sure you want to delete this Organisme?')) {
      this.organismeservice.deleteOrganisme(id).subscribe(() => {
        console.log('Organisme deleted successfully!');
        this.getAllOrganisme();
      });
    }
  }

  openAddOrganismeModal() {
    this.isUpdate = false;
    this.router.navigate(['']);
  }

  onSubmit() {
    console.log([this.selectedFormations]);

    const tab = [this.selectedFormations]
    this.organismeservice.addOrganisme(this.organisme)
      .subscribe((newOrganisme: Organisme) => {
        this.organisme = newOrganisme;
        this.organismeservice.affecterFormations(newOrganisme.id, tab)
          .subscribe(
            (response: string) => {
              console.log(response);
              this.notification = response;
              setTimeout(() => {
                this.notification = '';
              }, 0);
              
            },
            
            (error) => {

              if (error.status === 404) {
                alert("Organisme non trouvé");
              }
            }
          );
        this.getAllOrganisme();

        this.notification = "Un nouveau organisme a été ajouté ou modifié";
        setTimeout(() => {
          this.notification = '';
        }, 6000);



      }, error => {
        console.error('Erreur lors de l\'ajout de la organisme : ', error);
        if (error.status === 500) {
          alert("Veuillez Vérifier que tous les champs sont vrais");
        }
      });
  
    this.showModal = false;
  }
  

  
  
  openUpdateFormationModal(organisme: Organisme) {
    // Vérifiez si l'organisme a des formations
    if (organisme.id) {
        this.organismeservice.getFormationsForOrganisme(organisme.id)
            .subscribe(
                (formations: Formation[]) => {
                    // Vérifiez si des formations existent
                    if (formations && formations.length > 0) {
                        // Copiez les propriétés de la première formation dans selectedFormationForUpdate
                        this.selectedFormationForUpdate = { ...formations[0] };
                        // Affichez la modal de mise à jour de la formation
                        this.showUpdateFormationModal = true;
                    } else {
                        // Si l'organisme n'a pas de formation, vous pouvez gérer cela ici (par exemple, afficher un message).
                        console.error('L\'organisme n\'a aucune formation associée.');
                    }
                },
                (error) => {
                    // Gérez les erreurs liées à la récupération des formations
                    console.error('Erreur lors de la récupération des formations pour l\'organisme : ', error);
                }
            );
    } else {
        // Gérez le cas où l'organisme n'a pas d'ID
        console.error('L\'organisme n\'a pas d\'ID.');
    }
}


  closeUpdateFormationModal() {
    this.showUpdateFormationModal = false;
    this.selectedFormationForUpdate = null;
  }


  updateFormation() {
    if (this.selectedFormationForUpdate) {
      this.formationService.updateFormation(this.selectedFormationForUpdate)
        .subscribe(
          (response: string) => {
            console.log(response);
            // Reset selectedFormationForUpdate after successful update
            this.selectedFormationForUpdate = null;
            // Close the modal
            this.closeUpdateFormationModal();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la formation : ', error);
            // Handle update errors
          }
        );
    }
  }


  
  
}
