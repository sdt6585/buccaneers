
-- -----------------------------------------------------
-- Data for table `cyberpunk2`.`stat`
-- -----------------------------------------------------
START TRANSACTION;
USE `cyberpunk2`;
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Intelligence');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Reflect');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Dexterity');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Technique');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Badass');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Willpower');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Luck');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Movement');
INSERT INTO `cyberpunk2`.`stat` (`stat_id`, `name`) VALUES (DEFAULT, 'Body');

COMMIT;


-- -----------------------------------------------------
-- Data for table `cyberpunk2`.`skill`
-- -----------------------------------------------------
START TRANSACTION;
USE `cyberpunk2`;
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Concentration', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Conceal', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Lip Reading', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Perception', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Tracking', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Athletics', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Contortionist', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Dance', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Endurance', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Resist Torture', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Stealth', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Sea Vessel Pilot', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Accounting', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Animal Handling', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Cooking', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Business', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Composition', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Deduction', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Education', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Gambling', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Language', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Research', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Local Expert', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Science', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Tactics', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Survival', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Brawling', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Evasion', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Melee Weapons', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Acting', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Play Instrument', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Archery', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Pistols', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Heavy Explosives', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Charisma', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Empathy', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Interrogation', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Persuasion', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Style', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Seawise', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Medicine', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Theft', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Carpentry', 1);
INSERT INTO `cyberpunk2`.`skill` (`skill_id`, `name`, `stat_id`) VALUES (DEFAULT, 'Techsmith', 1);

COMMIT;
