package com.example.ormarko.ormarko.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Marketer {

        @Id
        private String username; // Unique identifier
        private String pass;      // Password
        private String eMail;     // Email address

        // Default constructor
        public Marketer() {
        }

        // Parameterized constructor
        public Marketer(String username, String pass, String eMail) {
                this.username = username;
                this.pass = pass;
                this.eMail = eMail;
        }

        // Getters and Setters
        public String getUsername() {
                return username;
        }

        public void setUsername(String username) {
                this.username = username;
        }

        public String getPass() {
                return pass;
        }

        public void setPass(String pass) {
                this.pass = pass;
        }

        public String geteMail() {
                return eMail;
        }

        public void seteMail(String eMail) {
                this.eMail = eMail;
        }
}
