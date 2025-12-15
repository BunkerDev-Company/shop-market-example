-- ===============================
-- TABLES
-- ===============================

CREATE TABLE "Order" (
    id UUID PRIMARY KEY,
    fio VARCHAR,
    address VARCHAR,
    city VARCHAR,
    is_pickup BOOLEAN NOT NULL DEFAULT FALSE,
    number_order VARCHAR,
    price BIGINT NOT NULL DEFAULT 0,
    score BIGINT NOT NULL DEFAULT 0,
    is_add_score BOOLEAN NOT NULL DEFAULT FALSE,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    user_id UUID,
    cart_order_id UUID UNIQUE     -- 1:1 отношение
);

CREATE TABLE "CartOrder" (
    id UUID PRIMARY KEY,
    price BIGINT NOT NULL DEFAULT 0,
    score BIGINT NOT NULL DEFAULT 0,
    is_add_score BOOLEAN NOT NULL DEFAULT FALSE,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "ProductCartOrder" (
    id UUID PRIMARY KEY,
    price BIGINT NOT NULL DEFAULT 0,
    score BIGINT NOT NULL DEFAULT 0,
    is_add_score BOOLEAN NOT NULL DEFAULT FALSE,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    product_id UUID,
    cart_order_id UUID
);

-- ===============================
-- RELATIONS
-- ===============================

ALTER TABLE "Order"
    ADD CONSTRAINT fk_order_user
        FOREIGN KEY (user_id) REFERENCES "User"(id);

ALTER TABLE "Order"
    ADD CONSTRAINT fk_order_cart_order
        FOREIGN KEY (cart_order_id) REFERENCES "CartOrder"(id);

ALTER TABLE "ProductCartOrder"
    ADD CONSTRAINT fk_pco_product
        FOREIGN KEY (product_id) REFERENCES "Product"(id);

ALTER TABLE "ProductCartOrder"
    ADD CONSTRAINT fk_pco_cart_order
        FOREIGN KEY (cart_order_id) REFERENCES "CartOrder"(id);

ALTER TABLE "ProductCartOrder" ADD count_product BIGINT NOT NULL DEFAULT 0;