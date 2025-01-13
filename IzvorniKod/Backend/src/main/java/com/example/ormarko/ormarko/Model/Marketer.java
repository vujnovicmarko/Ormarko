package com.example.ormarko.ormarko.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "\"marketers\"")
public class Marketer {

        @Id
        private String username;

        @NotBlank(message = "Password cannot be empty")
        private String pass;

        @Column(name="e_mail")
        @Email(message = "Please provide a valid email address")
        @JsonProperty("email")
        private String eMail;

        private byte[] logo;



        public Marketer() {
        }


        public Marketer(String username, String pass, String eMail, byte[] logo) {
                this.username = username;
                this.pass = pass;
                this.eMail = eMail;
                this.logo = logo;
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

        public byte[] getLogo(){ return logo; }

        public void setLogo(byte[] logo){ this.logo=logo; }

}
