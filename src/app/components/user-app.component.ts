import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

/**
 * Componente principal para la gestion de usuarios.
 * Maneja la vista principal, la lista de usuarios y las operaciones CRUD.
 * Utiliza el patron de comunicacion mediante servicios para compartir datos.
 */
@Component({
  selector: 'user-app', // Selector para usar el componente en templates
  standalone: true, // Indica que es un componente independiente
  imports: [RouterOutlet, NavbarComponent], // Componentes necesarios
  templateUrl: './user-app.component.html', // Template asociado
  styleUrls: ['./user-app.component.css'], // Estilos asociados
})
export class UserAppComponent implements OnInit {
  // Arreglo que almacena todos los usuarios cargados desde el backend
  users: User[] = [];
  
  // Usuario actualmente seleccionado para edicion o visualizacion
  // userSelected: User;
  
  // Variable comentada que se usaba para controlar estado del modal
  // open: boolean = false;

  /**
   * Constructor del componente que inyecta las dependencias necesarias
   * @param router - Servicio para manejar la navegacion
   * @param service - Servicio para operaciones CRUD de usuarios
   * @param sharingData - Servicio para compartir datos entre componentes
   */
  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
    // Inicializamos el usuario seleccionado con un objeto vacio
    // this.userSelected = new User();
  }

  /**
   * Inicializacion del componente.
   * Se ejecuta despues del constructor y configura las suscripciones a eventos
   */
  ngOnInit(): void {
    // Carga inicial de usuarios desde el backend
    this.service.findAll().subscribe((users) => (this.users = users));
    
    // Configuracion de suscripciones a eventos
    this.addUser(); // Evento de creacion/actualizacion
    this.removeUser(); // Evento de eliminacion
    // this.setSelectedUser(); // Evento de seleccion
    this.findUserById();
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  /**
   * Maneja la creacion y actualizacion de usuarios.
   * Se suscribe al evento newUserEventEmitter del servicio compartido.
   * Actualiza la lista local y muestra notificaciones.
   */
  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        // Actualizacion: reemplaza el usuario existente manteniendo inmutabilidad
        this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
      } else {
        // Creacion: agrega el nuevo usuario con ID generado
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      
      // Actualiza la vista navegando con los nuevos datos
      this.router.navigate(['/users'], {state: {users: this.users}});

      // Notificacion de exito usando SweetAlert2
      Swal.fire({
        title: 'Guardado',
        text: 'Usuario guradado con exito!',
        icon: 'success',
      });
      
      // Reinicia el usuario seleccionado
      // this.userSelected = new User();
    });
  }

  /**
   * Maneja la eliminacion de usuarios.
   * Se suscribe al evento idUserEventEmitter del servicio compartido.
   * Muestra dialogo de confirmacion y actualiza la lista si se confirma.
   */
  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe((id) => {
      // Dialogo de confirmacion antes de eliminar
      Swal.fire({
        title: 'Esta seguro?',
        text: 'Cuidado, el usuario sera eliminado del sistema!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Elimina el usuario usando filter para mantener inmutabilidad
          this.users = this.users.filter((user) => user.id != id);
          
          // Refresca la vista usando navegacion
          // skipLocationChange evita que se registre en el historial
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], {state: {users: this.users}});
          })
          
          // Notificacion de eliminacion exitosa
          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario eliminado con exito.',
            icon: 'success',
          });
        }
      });
    });
  }

  /**
   * Maneja la seleccion de usuarios.
   * Se suscribe al evento selectdUserEmitter del servicio compartido.
   * Actualiza el usuario seleccionado usando spread para mantener inmutabilidad.
   */
  // setSelectedUser(): void {
  //   this.sharingData.selectdUserEmitter.subscribe(userRow => this.userSelected = { ...userRow })
  // }

  /**
   * Metodo comentado que se usaba para controlar visibilidad del modal
   * Se elimino al cambiar la implementacion de la interfaz
   */
  // setOpen(){
  //   this.open = !this.open;
  // }
}