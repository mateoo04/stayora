package com.mateo.stayora_backend.repository;

import com.mateo.stayora_backend.api.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
