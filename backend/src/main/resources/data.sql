-- Sample Menu Items
INSERT INTO menu_items (name, description, price, category, image_url, available, preparation_time, created_at, updated_at) VALUES
('Espresso', 'Rich and bold Italian coffee', 3.50, 'Coffee', NULL, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cappuccino', 'Espresso with steamed milk and foam', 4.50, 'Coffee', NULL, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Latte', 'Espresso with steamed milk', 4.75, 'Coffee', NULL, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Americano', 'Espresso with hot water', 3.75, 'Coffee', NULL, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mocha', 'Espresso with chocolate and steamed milk', 5.25, 'Coffee', NULL, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Croissant', 'Buttery flaky French pastry', 3.25, 'Pastry', NULL, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chocolate Muffin', 'Rich chocolate chip muffin', 3.75, 'Pastry', NULL, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Blueberry Scone', 'Fresh blueberry scone', 3.50, 'Pastry', NULL, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cinnamon Roll', 'Sweet cinnamon roll with icing', 4.25, 'Pastry', NULL, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Club Sandwich', 'Triple-decker with turkey, bacon, and vegetables', 8.95, 'Sandwich', NULL, true, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Grilled Cheese', 'Classic grilled cheese sandwich', 6.50, 'Sandwich', NULL, true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BLT Sandwich', 'Bacon, lettuce, and tomato', 7.50, 'Sandwich', NULL, true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Veggie Wrap', 'Fresh vegetables in a tortilla wrap', 7.25, 'Sandwich', NULL, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Caesar Salad', 'Romaine lettuce with Caesar dressing and croutons', 8.50, 'Salad', NULL, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Greek Salad', 'Fresh vegetables with feta cheese and olives', 9.25, 'Salad', NULL, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Garden Salad', 'Mixed greens with fresh vegetables', 7.75, 'Salad', NULL, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
