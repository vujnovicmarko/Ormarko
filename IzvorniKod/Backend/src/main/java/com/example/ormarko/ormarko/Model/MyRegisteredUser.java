package com.example.ormarko.ormarko.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MyRegisteredUser {

    @Id
    private String username;
    private String password;
    private String city;
    private String country;
    private String e_mail;


    @SuppressWarnings("unused")
    public String getUsername() {
        return username;
    }
    @SuppressWarnings("unused")
    public void setUsername(String username) {
        this.username = username;
    }
    @SuppressWarnings("unused")
    public String getPassword() {
        return password;
    }
    @SuppressWarnings("unused")
    public void setPassword(String password) {
        this.password = password;
    }
    @SuppressWarnings("unused")
    public String getCity() {
        return city;
    }
    @SuppressWarnings("unused")
    public void setCity(String city) {
        this.city = city;
    }
    @SuppressWarnings("unused")
    public String getCountry() {
        return country;
    }
    @SuppressWarnings("unused")
    public void setCountry(String country) {
        this.country = country;
    }
    @SuppressWarnings("unused")
    public String getE_mail() {
        return e_mail;
    }
    @SuppressWarnings("unused")
    public void setE_mail(String e_mail) {
        this.e_mail = e_mail;
    }
}