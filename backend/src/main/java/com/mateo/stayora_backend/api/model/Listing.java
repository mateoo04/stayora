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

    protected Listing(){}

    public Listing(User host, String title, String description, BigDecimal nightPrice) {
        this.host = host;
        this.title = title;
        this.description = description;
        this.nightPrice = nightPrice;
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


}
