package com.learning.restaurant.service;

import com.learning.restaurant.dto.MenuItemDTO;
import com.learning.restaurant.model.MenuItem;
import com.learning.restaurant.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Transactional(readOnly = true)
    public List<MenuItemDTO> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MenuItemDTO> getAvailableMenuItems() {
        return menuItemRepository.findByAvailable(true).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MenuItemDTO> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategoryAndAvailable(category, true).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MenuItemDTO getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
        return convertToDTO(menuItem);
    }

    @Transactional
    public MenuItemDTO createMenuItem(MenuItemDTO menuItemDTO) {
        MenuItem menuItem = convertToEntity(menuItemDTO);
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDTO(savedMenuItem);
    }

    @Transactional
    public MenuItemDTO updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));

        existingMenuItem.setName(menuItemDTO.getName());
        existingMenuItem.setDescription(menuItemDTO.getDescription());
        existingMenuItem.setPrice(menuItemDTO.getPrice());
        existingMenuItem.setCategory(menuItemDTO.getCategory());
        existingMenuItem.setImageUrl(menuItemDTO.getImageUrl());
        existingMenuItem.setAvailable(menuItemDTO.getAvailable());
        existingMenuItem.setPreparationTime(menuItemDTO.getPreparationTime());

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDTO(updatedMenuItem);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    private MenuItemDTO convertToDTO(MenuItem menuItem) {
        MenuItemDTO dto = new MenuItemDTO();
        dto.setId(menuItem.getId());
        dto.setName(menuItem.getName());
        dto.setDescription(menuItem.getDescription());
        dto.setPrice(menuItem.getPrice());
        dto.setCategory(menuItem.getCategory());
        dto.setImageUrl(menuItem.getImageUrl());
        dto.setAvailable(menuItem.getAvailable());
        dto.setPreparationTime(menuItem.getPreparationTime());
        return dto;
    }

    private MenuItem convertToEntity(MenuItemDTO dto) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(dto.getName());
        menuItem.setDescription(dto.getDescription());
        menuItem.setPrice(dto.getPrice());
        menuItem.setCategory(dto.getCategory());
        menuItem.setImageUrl(dto.getImageUrl());
        menuItem.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        menuItem.setPreparationTime(dto.getPreparationTime());
        return menuItem;
    }
}
