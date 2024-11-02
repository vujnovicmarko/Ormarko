package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    @Query("SELECT DISTINCT l FROM Location l WHERE l.locationId = :closetId")
    List<Location> findAllLocationsForCloset(Integer closetId);

    Location findByLocationId(Integer locationId);
}
