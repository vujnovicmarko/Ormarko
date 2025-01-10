package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.CustomUser;
import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Repository.MarketerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class MarketerService implements UserDetailsService {

    @Autowired
    private final MarketerRepository repository;

    public MarketerService(MarketerRepository repository) {
        this.repository = repository;
    }

    public Optional<Marketer> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Marketer> user = repository.findByUsername(username);
        if (user.isPresent()) {
            var userObject = user.get();
            return CustomUser.builder()
                    .username(userObject.getUsername())
                    .password(userObject.getPass())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_MARKETER")))
                    .build();
        } else {
            throw new UsernameNotFoundException("Marketer not found: " + username);
        }
    }
}
