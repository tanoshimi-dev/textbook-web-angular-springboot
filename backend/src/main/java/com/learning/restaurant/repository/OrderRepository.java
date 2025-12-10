package com.learning.restaurant.repository;

import com.learning.restaurant.model.Order;
import com.learning.restaurant.model.OrderStatus;
import com.learning.restaurant.model.OrderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByOrderType(OrderType orderType);

    List<Order> findByCustomerNameContainingIgnoreCase(String customerName);

    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Order> findByStatusOrderByCreatedAtDesc(OrderStatus status);
}
