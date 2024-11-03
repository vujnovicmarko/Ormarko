package com.example.ormarko.ormarko.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"users\"")
public class User {

    @Id
    private String username;
    @NotBlank(message = "Password cannot be empty")
    @JsonProperty("password")
    private String pass;
    private String city;
    private String country;
    @Email(message = "Please provide a valid email address")
    @JsonProperty("email")
    private String e_mail;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(String username, String pass, String city, String country, String eMail) {
        this.username = username;
        this.pass = pass;
        this.city = city;
        this.country = country;
        this.e_mail = eMail;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPass() {
        return pass;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public String getE_mail() {
        return e_mail;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setE_mail(String eMail) {
        this.e_mail = eMail;
    }

    // Optionally, override toString() for better readability
    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", pass='" + pass + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", eMail='" + e_mail + '\'' +
                '}';
    }
}

