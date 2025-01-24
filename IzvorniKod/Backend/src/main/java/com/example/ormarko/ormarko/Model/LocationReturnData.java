package com.example.ormarko.ormarko.Model;

public class LocationReturnData {

    private int locationId;
    private LocationType locationType;
    private int locationIndex;

    public LocationReturnData(int locationId, LocationType locationType, int locationIndex) {
        this.locationId = locationId;
        this.locationType = locationType;
        this.locationIndex = locationIndex;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }

    public int getLocationIndex() {
        return locationIndex;
    }

    public void setLocationIndex(int locationIndex) {
        this.locationIndex = locationIndex;
    }
}
