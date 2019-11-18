package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.auth.AuthenticationRequest;
import cz.zorganizovano.backend.dao.UserDao;
import cz.zorganizovano.backend.entity.User;
import cz.zorganizovano.backend.security.JwtTokenProvider;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthEndpoint {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserDao userDao;

    @PostMapping("/login")
    public String login(@RequestBody AuthenticationRequest data) {
        try {
            String username = data.getUsername();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));

            User user = userDao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"));

            String token = jwtTokenProvider.createToken(
                username,
                user.getAuthorities().stream().map(authority -> authority.getAuthority()).collect(Collectors.toList())
            );

            return token;
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

}
