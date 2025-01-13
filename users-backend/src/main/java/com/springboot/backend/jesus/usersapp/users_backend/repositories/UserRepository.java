package com.springboot.backend.jesus.usersapp.users_backend.repositories;
import org.springframework.data.repository.CrudRepository;
import com.springboot.backend.jesus.usersapp.users_backend.entities.User;


public interface UserRepository extends CrudRepository<User, Long> {
    // Hereda metodos basicos para interactuar con la BD:
    // - findAll()
    // - findById(id)
    // - save(entity)
    // - deleteById(id)
}
