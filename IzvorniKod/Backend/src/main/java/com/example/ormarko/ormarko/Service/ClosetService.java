package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Repository.ClosetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClosetService {

    private final ClosetRepository closetRepository;

    public ClosetService(ClosetRepository closetRepository) {
        this.closetRepository = closetRepository;
    }

    public List<Closet> findAllClosetsForUser(String username) {
        return closetRepository.findAllClosetsForUser(username);
    }

    public Closet findClosetById(Integer id) {
        return closetRepository.findClosetByClosetId(id);
    }

    public Closet saveCloset(Closet closet) {
        return closetRepository.save(closet);
    }

    public void deleteCloset(Closet closet) {
        closetRepository.delete(closet);
    }
}
