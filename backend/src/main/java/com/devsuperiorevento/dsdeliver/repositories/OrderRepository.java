package com.devsuperiorevento.dsdeliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperiorevento.dsdeliver.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
