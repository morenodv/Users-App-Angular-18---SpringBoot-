import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * Componente para el formulario de usuarios.
 * Maneja la creacion y edicion de usuarios mediante un formulario.
 */
@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  // Instancia del usuario que se esta creando o editando
  user: User;

  // EventEmitter comentado que se usaba para el modal
  // @Output() openEventEmitter = new EventEmitter();

  /**
   * Inicializa el componente y verifica si hay datos de usuario en la navegacion.
   * Si existe un usuario en el estado de navegacion, lo carga para edicion.
   * Si no existe, crea una nueva instancia de usuario.
   */
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: UserService,
  ){
    this.user = new User();
    // if(this.router.getCurrentNavigation()?.extras.state){
    //   this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    // } else {
    // }
  }
  ngOnInit(): void {
    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user) // ya no se emite el id
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if(id > 0 ){
        this.sharingData.findUserByIdEventEmitter.emit(id); // ya no se emite el id
        // this.service.findById(id).subscribe(user => this.user = user);
      }
    })
  }

  /**
   * Maneja el envio del formulario.
   * Si el formulario es valido, emite el usuario a traves del servicio compartido.
   * Luego reinicia el formulario.
   */
  onSubmit(userForm: NgForm){
    if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  /**
   * Limpia el formulario.
   * Se muestran diferentes formas de resetear el formulario (comentadas).
   */
  onClear(userForm: NgForm): void { 
    // cualquiera de los 3 funciona
    // this.user = new User(); 
    userForm.reset();
    // userForm.resetForm();
  }

  /**
   * Metodo comentado que se usaba para controlar el modal.
   * Ya no se utiliza en la implementacion actual.
   */
  // onOpenClose(): void{
  //   this.openEventEmitter.emit();
  // }
}