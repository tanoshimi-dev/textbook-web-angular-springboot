package com.learning.restaurant.dto;

import com.learning.restaurant.model.OrderStatus;
import com.learning.restaurant.model.OrderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerEmail;

    private String customerPhone;

    private String tableNumber;

    @NotNull(message = "Order type is required")
    private OrderType orderType;

    private OrderStatus status;

    private List<OrderItemDTO> items = new ArrayList<>();

    private BigDecimal totalAmount;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
