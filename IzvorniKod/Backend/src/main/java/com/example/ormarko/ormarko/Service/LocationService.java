package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import com.example.ormarko.ormarko.Repository.ClosetRepository;
import com.example.ormarko.ormarko.Repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> findAllLocationsForCloset(Integer closetId) {
        return locationRepository.findAllLocationsForCloset(closetId);
    }

    public Location findLocationById(Integer locationId) {
        return locationRepository.findByLocationId(locationId);
    }
}
