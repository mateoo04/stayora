package com.mateo.stayora_backend.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mateo.stayora_backend.api.enums.ListingStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    private User host;

    @JsonIgnore
    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal nightPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.DRAFT;

    @Column(nullable = false)
    private String city;

    private String addressLine;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    protected Listing(){}

    public Listing(User host, String title, String description, BigDecimal nightPrice, ListingStatus status, String city, String addressLine, double latitude, double longitude) {
        this.host = host;
        this.title = title;
        this.description = description;
        this.nightPrice = nightPrice;
        this.status = status;
        this.city = city;
        this.addressLine = addressLine;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public User getHost() {
        return host;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getNightPrice() {
        return nightPrice;
    }

    public void setNightPrice(BigDecimal nightPrice) {
        this.nightPrice = nightPrice;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public void publish() {
        if (this.status != ListingStatus.DRAFT && this.status != ListingStatus.PAUSED) {
            throw new IllegalStateException("Listing cannot be published");
        }
        this.status = ListingStatus.ACTIVE;
    }

    public void approve() {
        this.status = ListingStatus.ACTIVE;
    }

    public void pause() {
        this.status = ListingStatus.PAUSED;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
