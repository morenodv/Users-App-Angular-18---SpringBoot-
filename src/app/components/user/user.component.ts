import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Route, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

/**
 * Componente que maneja la lista de usuarios y sus operaciones principales
 */
@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
  // Titulo que se muestra en la vista
  title: string = 'Estado usuarios';

  // Array que almacena la lista de usuarios
  users: User[] = [];

  /**
   * Constructor que inicializa el componente y carga los usuarios
   * Si hay usuarios en el estado de navegacion, los usa
   * Si no, los obtiene del servicio
   */
  constructor(
    
    private sharingData: SharingDataService,
    private service: UserService,
    private router: Router,
  ) {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users']
    }
  }

  ngOnInit(): void {
    if(this.users == undefined || this.users.length == 0 || this.users == null){
      this.service.findAll().subscribe(users => this.users = users);// se cambio metodo al onInit para que cada vez que se cree el componente se va buscar al backend
    }

  }

  /**
   * Emite el ID del usuario a eliminar
   * Se reemplazo el confirm nativo por un modal de SweetAlert2
   */
  onRemoveUser(id: number): void {
    //se cambio el confirm por un modal
    const confirmRemove = confirm('Esta seguro que desea eliminar');
    // if (confirmRemove) {
      this.sharingData.idUserEventEmitter.emit(id);
    // }
  }

  /**
   * Navega a la ruta de edicion cuando se selecciona un usuario
   * Pasa el usuario seleccionado en el estado de navegacion
   */
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }
}