package com.example.ormarko.ormarko.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"closets\"")
public class Closet {

        @Id
        private int closetId;

        private String closetOwner;

        // Default constructor
        public Closet() {
        }

        public Closet(String closetOwner) {
                this.closetOwner = closetOwner;
        }

        // Getters
        public int getClosetId() {
                return closetId;
        }

        public String getClosetOwner() {
                return closetOwner;
        }

        // Setters
        public void setClosetId(int closetId) {
                this.closetId = closetId;
        }

        public void setClosetOwner(String closetOwner) {
                this.closetOwner = closetOwner;
        }

        // Optionally, override toString() for better readability
        @Override
        public String toString() {
                return "Closet{" +
                        "closetId=" + closetId +
                        ", closetOwner='" + closetOwner + '\'' +
                        '}';
        }
}

