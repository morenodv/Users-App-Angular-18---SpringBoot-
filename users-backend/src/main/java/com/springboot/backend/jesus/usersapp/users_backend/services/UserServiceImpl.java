package com.springboot.backend.jesus.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.jesus.usersapp.users_backend.entities.User;
import com.springboot.backend.jesus.usersapp.users_backend.repositories.UserRepository;

@Service // Marca la clase como un servicio de Spring
public class UserServiceImpl implements UserService {

    private UserRepository repository; // Repositorio para interactuar con la BD

    // Constructor para inyectar el repositorio (inyeccion de dependencias)
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true) // Operacion de solo lectura (optimiza el rendimiento)
    public List<User> findAll() {
        return (List<User>) this.repository.findAll(); // Obtiene todos los usuarios de la BD
    }

    @Override
    @Transactional(readOnly = true) // Operacion de solo lectura
    public Optional<User> findById(@NonNull Long id) {
        return repository.findById(id); // Busca usuario por id en la BD
    }

    @Override
    @Transactional // Operacion de escritura
    public User save(User user) {
        return repository.save(user); // Guarda o actualiza un usuario en la BD
    }

    @Override
    @Transactional // Operacion de escritura
    public void deleteById(Long id) {
        repository.deleteById(id); // Elimina un usuario por id en la BD
    }
}
