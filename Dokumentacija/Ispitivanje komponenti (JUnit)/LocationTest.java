import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;

import javax.naming.directory.InvalidAttributeValueException;

import static org.junit.jupiter.api.Assertions.*;

enum LocationType {
    POLICA,
    LADICA,
    ŠIPKA_ZA_ODJEĆU
}

class Location {

    private int locationId;

    private int closetId;

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

public class LocationTest {

    Location location;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class Location");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class Location");
    }

    @BeforeEach
    void setUp(){
        location = new Location();
    }

    @Test
    @DisplayName("TC-06: Setting and getting Location variables")
    void testGetSet(){
        location.setLocationId(1);
        location.setClosetId(1);
        location.setTypeLoc(LocationType.POLICA);
        assertAll("Location variable states",
                () -> assertEquals(1, location.getLocationId()),
                () -> assertEquals(1, location.getClosetId()),
                () -> assertEquals(LocationType.POLICA, location.getTypeLoc())
        );
    }

    @Test
    @DisplayName("TC-07: Printing Location object")
    void testPrint(){
        location = new Location(1, LocationType.POLICA);
        location.setLocationId(1);
        assertEquals("Location{locationId=1, closetId=1, typeLoc=POLICA}", location.toString());
    }


}

