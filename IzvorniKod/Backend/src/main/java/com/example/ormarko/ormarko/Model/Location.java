package com.example.ormarko.ormarko.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"locations\"")
public class Location {

        @Id
        private int locationId;

        private int closetId;

        @Enumerated(EnumType.STRING) // Store the enum as a string in the database
        private LocationType locationType;

        // Default constructor
        public Location() {
        }

        // Parameterized constructor
        public Location(int closetId, LocationType typeLoc) {
                this.closetId = closetId;
                this.locationType = typeLoc;
        }

        // Getters
        public int getLocationId() {
                return locationId;
        }

        public int getClosetId() {
                return closetId;
        }

        public LocationType getTypeLoc() {
                return locationType;
        }

        // Setters
        public void setLocationId(int locationId) {
                this.locationId = locationId;
        }

        public void setClosetId(int closetId) {
                this.closetId = closetId;
        }

        public void setTypeLoc(LocationType typeLoc) {
                this.locationType = typeLoc;
        }

        // Optionally, override toString() for better readability
        @Override
        public String toString() {
                return "Location{" +
                        "locationId=" + locationId +
                        ", closetId=" + closetId +
                        ", typeLoc=" + locationType +
                        '}';
        }
}

