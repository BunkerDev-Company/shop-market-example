-- ===============================
-- TABLES
-- ===============================

CREATE TABLE "Brand" (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    image VARCHAR,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Product" (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price BIGINT NOT NULL DEFAULT 0,
    image VARCHAR,
    score BIGINT NOT NULL DEFAULT 0,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    brand_id UUID
);

CREATE TABLE "User" (
    id UUID PRIMARY KEY,
    username VARCHAR NOT NULL,
    telegram_id BIGINT NOT NULL DEFAULT 0,
    score BIGINT NOT NULL DEFAULT 0,
    image VARCHAR,
    fio VARCHAR,
    address VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ===============================
-- RELATIONS
-- ===============================

ALTER TABLE "Product"
    ADD CONSTRAINT fk_product_brand
    FOREIGN KEY (brand_id) REFERENCES "Brand"(id);
