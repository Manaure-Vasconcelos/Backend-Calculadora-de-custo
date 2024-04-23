-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `market_weigth` DECIMAL(10, 2) NOT NULL,
    `market_price` DECIMAL(10, 2) NOT NULL,
    `gross_weigth` DECIMAL(10, 2) NOT NULL,
    `real_amount` DECIMAL(10, 2) NULL,
    `recipe_id` INTEGER UNSIGNED NOT NULL,

    INDEX `ingredients_recipes_FK`(`recipe_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title_recipe` VARCHAR(150) NOT NULL,
    `describe_recipes` TEXT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `recipes_unique`(`title_recipe`),
    INDEX `recipes_users_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_recipes_FK` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recipes` ADD CONSTRAINT `recipes_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
