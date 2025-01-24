import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;

class User {

    private String username;
    private String pass;
    private String city;
    private String country;
    private String e_mail;
    private Boolean googleoauth;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(String username, String pass, String city, String country, String eMail, Boolean googleoauth) {
        this.username = username;
        this.pass = pass;
        this.city = city;
        this.country = country;
        this.e_mail = eMail;
        this.googleoauth = googleoauth;

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

    public Boolean getGoogleoauth(){return googleoauth;}

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

    public void setGoogleoauth(Boolean googleoauth) {this.googleoauth = googleoauth;}

    // Optionally, override toString() for better readability
    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", pass='" + pass + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", eMail='" + e_mail + '\'' +
                ", googleoauth='" + googleoauth + '\'' +
                '}';
    }
}

public class UserTest {

    User user;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class User");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class User");
    }

    @BeforeEach
    void setUp(){
        user = new User();
    }

    @Test
    @DisplayName("TC-01: Setting and getting User variables")
    void testGetSet(){
        user.setUsername("lbulic");
        user.setPass("Ormarko123");
        user.setCity("Zagreb");
        user.setCountry("Croatia");
        user.setE_mail("luka.bulic0302@gmail.com");
        user.setGoogleoauth(false);
        assertAll("User variable states",
                () -> assertEquals("lbulic", user.getUsername()),
                () -> assertEquals("Ormarko123", user.getPass()),
                () -> assertEquals("Zagreb", user.getCity()),
                () -> assertEquals("Croatia", user.getCountry()),
                () -> assertEquals("luka.bulic0302@gmail.com", user.getE_mail()),
                () -> assertEquals(false, user.getGoogleoauth())
        );
    }

    @Test
    @DisplayName("TC-02: Printing User object")
    void testPrint(){
        user = new User("lbulic", "Ormarko123", "Zagreb", "Croatia", "luka.bulic0302@gmail.com", false);
        assertEquals("User{username='lbulic', pass='Ormarko123', city='Zagreb', country='Croatia', eMail='luka.bulic0302@gmail.com', googleoauth='false'}", user.toString());
    }

}

