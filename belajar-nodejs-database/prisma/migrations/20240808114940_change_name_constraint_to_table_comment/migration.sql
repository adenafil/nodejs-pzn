-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_customer_id_fkey`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `customer_to_comment_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
