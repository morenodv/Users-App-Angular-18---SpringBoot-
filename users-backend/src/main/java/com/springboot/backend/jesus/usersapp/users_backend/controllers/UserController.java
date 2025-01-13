package com.springboot.backend.jesus.usersapp.users_backend.controllers;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.jesus.usersapp.users_backend.entities.User;
import com.springboot.backend.jesus.usersapp.users_backend.services.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;




@RestController // Marca la clase como un controlador REST que devuelve datos (JSON)
@RequestMapping("/api/users") // Define la ruta base para este controlador
public class UserController {

    @Autowired // Inyecta el servicio en este controlador
    private UserService service;

    @GetMapping // Maneja solicitudes GET en /api/users
    public List<User> list() {
        return service.findAll(); // Llama al servicio para obtener todos los usuarios
    }
    
    @GetMapping("/{id}") // Maneja solicitudes GET en /api/users/{id}
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<User> userOptional = service.findById(id); // Busca usuario por id
        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.orElseThrow()); // Devuelve usuario si existe
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "El usuario no se encontro por el id: " + id)); // Devuelve error si no existe
    }
    
    @PostMapping // Maneja solicitudes POST en /api/users
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user)); // Guarda un nuevo usuario
    }

    @PutMapping("/{id}") // Maneja solicitudes PUT en /api/users/{id}
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        Optional<User> userOptional = service.findById(id); // Busca usuario por id
        if (userOptional.isPresent()) {
            User userDb = userOptional.get(); // Obtiene el usuario existente
            // Actualiza los datos del usuario
            userDb.setEmail(user.getEmail());
            userDb.setLastname(user.getLastname());
            userDb.setName(user.getName());
            userDb.setPassword(user.getPassword());
            userDb.setUsername(user.getUsername());
            return ResponseEntity.ok(service.save(userDb)); // Guarda los cambios y los devuelve
        }
        return ResponseEntity.notFound().build(); // Devuelve 404 si el usuario no existe
    }
    
    @DeleteMapping("/{id}") // Maneja solicitudes DELETE en /api/users/{id}
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<User> userOptional = service.findById(id); // Busca usuario por id
        if (userOptional.isPresent()) {
            service.deleteById(id); // Elimina el usuario por id
            return ResponseEntity.noContent().build(); // Devuelve 204 si se elimina correctamente
        }
        return ResponseEntity.notFound().build(); // Devuelve 404 si el usuario no existe
    }
}
