-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventory_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inventory_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventory_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `inventory_db` ;

-- -----------------------------------------------------
-- Table `inventory_db`.`Activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`Activities` (
  `activityID` INT NOT NULL AUTO_INCREMENT,
  `activityName` VARCHAR(25) NULL DEFAULT NULL,
  `activityDesc` VARCHAR(255) NULL DEFAULT NULL,
  `activityDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`activityID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`Employee` (
  `employeeNo` INT NOT NULL AUTO_INCREMENT,
  `employeeName` VARCHAR(30) NULL DEFAULT NULL,
  `employeeEmail` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`employeeNo`),
  UNIQUE INDEX `employeeEmail` (`employeeEmail` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`ProductCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`ProductCategory` (
  `categoryNo` INT NOT NULL,
  `categoryDescription` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`categoryNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`Product` (
  `productNo` INT NOT NULL,
  `productName` VARCHAR(25) NULL DEFAULT NULL,
  `serialNo` VARCHAR(25) NULL DEFAULT NULL,
  `unitPrice` DECIMAL(2,0) NULL DEFAULT NULL,
  `quantityOnHand` INT NULL DEFAULT NULL,
  `reorderLevel` INT NULL DEFAULT NULL,
  `reorderQuantity` INT NULL DEFAULT NULL,
  `reorderLeadTime` INT NULL DEFAULT NULL,
  `categoryNo` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`productNo`),
  UNIQUE INDEX `serialNo` (`serialNo` ASC) VISIBLE,
  INDEX `categoryNo` (`categoryNo` ASC) VISIBLE,
  CONSTRAINT `Product_ibfk_1`
    FOREIGN KEY (`categoryNo`)
    REFERENCES `inventory_db`.`ProductCategory` (`categoryNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`Supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`Supplier` (
  `supplierNo` INT NOT NULL,
  `supplierName` VARCHAR(25) NULL DEFAULT NULL,
  `supplierStreet` VARCHAR(25) NULL DEFAULT NULL,
  `supplierCity` VARCHAR(25) NULL DEFAULT NULL,
  `supplierState` VARCHAR(25) NULL DEFAULT NULL,
  `supplierZipCode` VARCHAR(25) NULL DEFAULT NULL,
  `suppTelNo` VARCHAR(25) NULL DEFAULT NULL,
  `suppFaxNo` VARCHAR(25) NULL DEFAULT NULL,
  `suppEmailAddress` VARCHAR(25) NULL DEFAULT NULL,
  `suppWebAddress` VARCHAR(25) NULL DEFAULT NULL,
  `contactName` VARCHAR(25) NULL DEFAULT NULL,
  `contactTelNo` VARCHAR(25) NULL DEFAULT NULL,
  `contactFaxNo` VARCHAR(25) NULL DEFAULT NULL,
  `contactEmailAddress` VARCHAR(25) NULL DEFAULT NULL,
  `paymentTerms` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`supplierNo`),
  UNIQUE INDEX `supplierName` (`supplierName` ASC) VISIBLE,
  UNIQUE INDEX `suppTelNo` (`suppTelNo` ASC) VISIBLE,
  UNIQUE INDEX `suppFaxNo` (`suppFaxNo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`PurchaseOrder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`PurchaseOrder` (
  `purchaseOrderNo` INT NOT NULL,
  `purchaseOrderDescription` VARCHAR(300) NULL DEFAULT NULL,
  `orderDate` DATETIME NULL DEFAULT NULL,
  `dateRequired` DATETIME NULL DEFAULT NULL,
  `shippedDate` DATETIME NULL DEFAULT NULL,
  `freightCharge` DECIMAL(10,0) NULL DEFAULT NULL,
  `supplierNo` VARCHAR(25) NULL DEFAULT NULL,
  `employeeNo` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`purchaseOrderNo`),
  INDEX `supplierNo` (`supplierNo` ASC) VISIBLE,
  INDEX `employeeNo` (`employeeNo` ASC) VISIBLE,
  CONSTRAINT `PurchaseOrder_ibfk_1`
    FOREIGN KEY (`supplierNo`)
    REFERENCES `inventory_db`.`Supplier` (`supplierNo`),
  CONSTRAINT `PurchaseOrder_ibfk_2`
    FOREIGN KEY (`employeeNo`)
    REFERENCES `inventory_db`.`Employee` (`employeeNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`Transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`Transaction` (
  `transactionNo` INT NOT NULL AUTO_INCREMENT,
  `transactionDate` DATETIME NULL DEFAULT NULL,
  `transactionDescription` VARCHAR(300) NULL DEFAULT NULL,
  `unitPrice` DECIMAL(2,0) NULL DEFAULT NULL,
  `unitsOrdered` INT NULL DEFAULT NULL,
  `unitsReceived` INT NULL DEFAULT NULL,
  `unitsSold` INT NULL DEFAULT NULL,
  `unitsWastage` INT NULL DEFAULT NULL,
  `productNo` VARCHAR(25) NULL DEFAULT NULL,
  `purchaseOrderNo` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`transactionNo`),
  INDEX `productNo` (`productNo` ASC) VISIBLE,
  INDEX `purchaseOrderNo` (`purchaseOrderNo` ASC) VISIBLE,
  CONSTRAINT `Transaction_ibfk_1`
    FOREIGN KEY (`productNo`)
    REFERENCES `inventory_db`.`Product` (`productNo`),
  CONSTRAINT `Transaction_ibfk_2`
    FOREIGN KEY (`purchaseOrderNo`)
    REFERENCES `inventory_db`.`PurchaseOrder` (`purchaseOrderNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `inventory_db` ;

-- -----------------------------------------------------
--  routine1
-- -----------------------------------------------------

DELIMITER $$
USE `inventory_db`$$
$$

DELIMITER ;
USE `inventory_db`;

DELIMITER $$
USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`employee_activity`
AFTER INSERT ON `inventory_db`.`Employee`
FOR EACH ROW
BEGIN
   CALL activity_function('Employee Activity', 'User inserted a new Employee');
END$$

USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`product_Category_activity`
AFTER INSERT ON `inventory_db`.`ProductCategory`
FOR EACH ROW
BEGIN
   CALL activity_function('ProductCategory Activity', 'User inserted a new Category');
END$$

USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`product_activity`
AFTER INSERT ON `inventory_db`.`Product`
FOR EACH ROW
BEGIN
   CALL activity_function('Product Activity', 'User inserted a new Product');
END$$

USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`Supplier_activity`
AFTER INSERT ON `inventory_db`.`Supplier`
FOR EACH ROW
BEGIN
   CALL activity_function('Supplier Activity', 'User inserted a new Product');
END$$

USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`PurchaseOrder_activity`
AFTER INSERT ON `inventory_db`.`PurchaseOrder`
FOR EACH ROW
BEGIN
   CALL activity_function('PurchaseOrder Activity', 'User inserted a new Product');
END$$

USE `inventory_db`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `inventory_db`.`transaction_activity`
AFTER INSERT ON `inventory_db`.`Transaction`
FOR EACH ROW
BEGIN
   CALL activity_function('Product Activity', 'User inserted a new Product');
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
