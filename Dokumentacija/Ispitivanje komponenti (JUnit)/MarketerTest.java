import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;

class Marketer {

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

public class MarketerTest {

    Marketer marketer;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class Marketer");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class Marketer");
    }

    @BeforeEach
    void setUp(){
        marketer = new Marketer();
    }

    @Test
    @DisplayName("TC-03: Setting and getting Marketer variables")
    void testGetSet(){
        marketer.setUsername("lbulic");
        marketer.setPass("Ormarko123");
        marketer.seteMail("luka.bulic0302@gmail.com");
        assertAll("Marketer variable states",
                () -> assertEquals("lbulic", marketer.getUsername()),
                () -> assertEquals("Ormarko123", marketer.getPass()),
                () -> assertEquals("luka.bulic0302@gmail.com", marketer.geteMail())
        );
    }
}
