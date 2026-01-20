package com.mateo.stayora_backend.repository;

import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.api.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    Page<User> findByEmailContainingAndRoleAndIdNot(String email, UserRole role, Long id, Pageable pageable);
    Page<User> findByEmailContainingAndIdNot(String email, Long id, Pageable pageable);
    Page<User> findByRoleAndIdNot(UserRole role, Long id, Pageable pageable);
    Page<User> findByIdNot(Long id, Pageable pageable);


    @Modifying
    @Query("update User u set u.role = :role where u.id = :id")
    void updateRoleById(@Param("id") Long id, @Param("role") UserRole role);
}
