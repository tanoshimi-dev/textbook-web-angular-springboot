package com.learning.restaurant.controller;

import com.learning.restaurant.dto.MenuItemDTO;
import com.learning.restaurant.service.MenuItemService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    @GetMapping("/available")
    public ResponseEntity<List<MenuItemDTO>> getAvailableMenuItems() {
        return ResponseEntity.ok(menuItemService.getAvailableMenuItems());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItemDTO>> getMenuItemsByCategory(
        @PathVariable String category
    ) {
        return ResponseEntity.ok(
            menuItemService.getMenuItemsByCategory(category)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDTO> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    @PostMapping
    public ResponseEntity<MenuItemDTO> createMenuItem(
        @Valid @RequestBody MenuItemDTO menuItemDTO
    ) {
        MenuItemDTO createdItem = menuItemService.createMenuItem(menuItemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemDTO> updateMenuItem(
        @PathVariable Long id,
        @Valid @RequestBody MenuItemDTO menuItemDTO
    ) {
        return ResponseEntity.ok(
            menuItemService.updateMenuItem(id, menuItemDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
