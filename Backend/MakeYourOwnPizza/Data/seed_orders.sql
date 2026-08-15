-- Seed file for order-related tables only
-- Inserts Users, Pizzas, Ingredients, Orders, OrderItems, OrderIngredients, OrderStages, Payments

START TRANSACTION;

-- 1) Users (two provided IDs)
-- NOTE: Users are assumed to already exist in the `User` table.
-- Do NOT run any INSERTs for User here to avoid duplicating existing users.

-- 2) Minimal Pizzas (referenced by order items)
INSERT INTO `Pizza` (Id, name, price) VALUES
('11111111-1111-1111-1111-111111111111', 'Margherita', 7.50),
('22222222-2222-2222-2222-222222222222', 'Pepperoni', 9.00);

-- 3) Minimal Ingredients (referenced by order ingredients)
INSERT INTO `Ingredients` (Id, name, stock, price, imageUrl) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Cheese', 100, 0.50, ''),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tomato', 100, 0.30, '');

-- 4) Orders for both users
INSERT INTO `Order` (Id, userId, createdAt, estimatedDelivery, totalPrice, paymentMethod, isActive)
VALUES
('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'b110dd03-4073-42e5-9c42-8fdf2268ff70', '2026-08-15 12:00:00', '2026-08-15 12:30:00', 16.50, 'Card', 1),
('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', '86e90278-94ef-44b3-8a18-cd230f887664', '2026-08-15 13:00:00', '2026-08-15 13:45:00', 9.00, 'Cash', 1);

-- 5) OrderItems
INSERT INTO `OrderItem` (Id, orderId, pizzaId, quantity, price) VALUES
('f1111111-1111-4f11-8f11-111111111111', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 1, 7.50),
('f2222222-2222-4f22-8f22-222222222222', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 1, 9.00),
('f3333333-3333-4f33-8f33-333333333333', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 1, 9.00);

-- 6) OrderIngredients (linking ingredients to order items)
-- Some DB schemas name the FK column `IngredientsId` (note plural). Use that column name to avoid "Unknown column 'ingredientId'" errors.
INSERT INTO `OrderIngredient` (Id, orderItemId, IngredientsId, quantity) VALUES
('c1111111-1111-4c11-8c11-111111111111', 'f1111111-1111-4f11-8f11-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1),
('c2222222-2222-4c22-8c22-222222222222', 'f2222222-2222-4f22-8f22-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1);

-- 7) OrderStages (history of order stages)
INSERT INTO `OrderStage` (Id, orderId, stageType, createdAt) VALUES
('s1111111-1111-4s11-8s11-111111111111', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'Created', '2026-08-15 12:00:00'),
('s2222222-2222-4s22-8s22-222222222222', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'Preparing', '2026-08-15 12:10:00'),
('s3333333-3333-4s33-8s33-333333333333', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'Created', '2026-08-15 13:00:00');

-- 8) Payments
INSERT INTO `Payment` (Id, orderId, amount, transactionId, paymentDate, idempotentKey) VALUES
('p1111111-1111-4p11-8p11-111111111111', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', 16.50, 'txn_abc_123', '2026-08-15 12:01:00', 'idem_1'),
('p2222222-2222-4p22-8p22-222222222222', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 9.00, 'txn_abc_124', '2026-08-15 13:02:00', 'idem_2');

COMMIT;
