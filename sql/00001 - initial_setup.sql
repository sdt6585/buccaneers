-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cyberpunk2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cyberpunk2` ;

-- -----------------------------------------------------
-- Schema cyberpunk2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cyberpunk2` DEFAULT CHARACTER SET utf8 ;
USE `cyberpunk2` ;

-- -----------------------------------------------------
-- Table `cyberpunk2`.`campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`campaign` (
  `campaign_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`campaign_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`user_campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`user_campaign` (
  `user_campaign_id` INT NOT NULL AUTO_INCREMENT,
  `campaign_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `active_character_id` INT NULL,
  PRIMARY KEY (`user_campaign_id`),
  CONSTRAINT `fk_user_campaign_campaign1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `cyberpunk2`.`campaign` (`campaign_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_campaign_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `cyberpunk2`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_campaign_character1`
    FOREIGN KEY (`active_character_id`)
    REFERENCES `cyberpunk2`.`character` (`character_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_user_campaign_campaign1_idx` ON `cyberpunk2`.`user_campaign` (`campaign_id` ASC) ;

CREATE INDEX `fk_user_campaign_user1_idx` ON `cyberpunk2`.`user_campaign` (`user_id` ASC) ;

CREATE INDEX `fk_user_campaign_character1_idx` ON `cyberpunk2`.`user_campaign` (`active_character_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`character`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`character` (
  `character_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL DEFAULT '',
  `hp` INT NOT NULL,
  `gold` INT NOT NULL,
  `exp` INT NOT NULL,
  `is_alive` TINYINT NOT NULL DEFAULT 1,
  `campaign_id` INT NOT NULL,
  `user_campaign_id` INT NOT NULL,
  PRIMARY KEY (`character_id`),
  CONSTRAINT `fk_character_campaign1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `cyberpunk2`.`campaign` (`campaign_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_character_user_campaign1`
    FOREIGN KEY (`user_campaign_id`)
    REFERENCES `cyberpunk2`.`user_campaign` (`user_campaign_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_character_campaign1_idx` ON `cyberpunk2`.`character` (`campaign_id` ASC) ;

CREATE INDEX `fk_character_user_campaign1_idx` ON `cyberpunk2`.`character` (`user_campaign_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`stat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`stat` (
  `stat_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`stat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`skill` (
  `skill_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `stat_id` INT NOT NULL,
  PRIMARY KEY (`skill_id`),
  CONSTRAINT `fk_skill_stat1`
    FOREIGN KEY (`stat_id`)
    REFERENCES `cyberpunk2`.`stat` (`stat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_skill_stat1_idx` ON `cyberpunk2`.`skill` (`stat_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`character_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`character_skill` (
  `character_skill_id` INT NOT NULL AUTO_INCREMENT,
  `skill_id` INT NOT NULL,
  `character_id` INT NOT NULL,
  PRIMARY KEY (`character_skill_id`),
  CONSTRAINT `fk_character_skill_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `cyberpunk2`.`skill` (`skill_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_character_skill_character1`
    FOREIGN KEY (`character_id`)
    REFERENCES `cyberpunk2`.`character` (`character_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_character_skill_skill1_idx` ON `cyberpunk2`.`character_skill` (`skill_id` ASC) ;

CREATE INDEX `fk_character_skill_character1_idx` ON `cyberpunk2`.`character_skill` (`character_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`inventory` (
  `inventory_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `description` VARCHAR(5000) NOT NULL,
  `hands_required` INT NOT NULL,
  `is_concealable` TINYINT NOT NULL,
  `weight` INT NOT NULL,
  `value` INT NOT NULL,
  `stat_id` INT NOT NULL,
  PRIMARY KEY (`inventory_id`),
  CONSTRAINT `fk_inventory_stat1`
    FOREIGN KEY (`stat_id`)
    REFERENCES `cyberpunk2`.`stat` (`stat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_inventory_stat1_idx` ON `cyberpunk2`.`inventory` (`stat_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`character_inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`character_inventory` (
  `character_inventory_id` INT NOT NULL AUTO_INCREMENT,
  `character_id` INT NOT NULL,
  `inventory_id` INT NOT NULL,
  `remaining_rounds` INT NOT NULL DEFAULT 0,
  `is_equipped` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`character_inventory_id`),
  CONSTRAINT `fk_character_inventory_character1`
    FOREIGN KEY (`character_id`)
    REFERENCES `cyberpunk2`.`character` (`character_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_character_inventory_inventory1`
    FOREIGN KEY (`inventory_id`)
    REFERENCES `cyberpunk2`.`inventory` (`inventory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_character_inventory_character1_idx` ON `cyberpunk2`.`character_inventory` (`character_id` ASC) ;

CREATE INDEX `fk_character_inventory_inventory1_idx` ON `cyberpunk2`.`character_inventory` (`inventory_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `roll_value` INT NOT NULL,
  `description` VARCHAR(5000) NOT NULL,
  `dice` INT NOT NULL,
  PRIMARY KEY (`log_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`character_stat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`character_stat` (
  `character_stat_id` INT NOT NULL AUTO_INCREMENT,
  `character_character_id` INT NOT NULL,
  `stat_stat_id` INT NOT NULL,
  `value` INT NOT NULL DEFAULT 2,
  PRIMARY KEY (`character_stat_id`),
  CONSTRAINT `fk_character_stat_character1`
    FOREIGN KEY (`character_character_id`)
    REFERENCES `cyberpunk2`.`character` (`character_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_character_stat_stat1`
    FOREIGN KEY (`stat_stat_id`)
    REFERENCES `cyberpunk2`.`stat` (`stat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_character_stat_character1_idx` ON `cyberpunk2`.`character_stat` (`character_character_id` ASC) ;

CREATE INDEX `fk_character_stat_stat1_idx` ON `cyberpunk2`.`character_stat` (`stat_stat_id` ASC) ;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`ability`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`ability` (
  `ability_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `description` VARCHAR(5000) NULL,
  PRIMARY KEY (`ability_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cyberpunk2`.`inventory_ability`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cyberpunk2`.`inventory_ability` (
  `inventory_ability_id` INT NOT NULL,
  PRIMARY KEY (`inventory_ability_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
