import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;

class Closet {

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

public class ClosetTest {

    Closet closet;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class Closet");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class Closet");
    }

    @BeforeEach
    void setUp(){
        closet = new Closet();
    }

    @Test
    @DisplayName("TC-04: Setting and getting Closet variables")
    void testGetSet(){
        closet.setClosetId(1);
        closet.setClosetOwner("lbulic");
        assertAll("Closet variable states",
                () -> assertEquals(1, closet.getClosetId()),
                () -> assertEquals("lbulic", closet.getClosetOwner())
        );
    }

    @Test
    @DisplayName("TC-05: Printing Closet object")
    void testPrint(){
        closet = new Closet("lbulic");
        closet.setClosetId(1);
        assertEquals("Closet{closetId=1, closetOwner='lbulic'}", closet.toString());
    }

}

