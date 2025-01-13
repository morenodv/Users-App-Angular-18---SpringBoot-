package com.springboot.backend.jesus.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.springboot.backend.jesus.usersapp.users_backend.entities.User;

public interface UserService {
    // Define los metodos que el servicio debe implementar
    List<User> findAll(); // Obtiene todos los usuarios
    Optional<User> findById(@NonNull Long id); // Busca un usuario por id
    User save(User user); // Guarda o actualiza un usuario
    void deleteById(Long id); // Elimina un usuario por id
}
