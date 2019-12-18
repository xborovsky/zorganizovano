package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
