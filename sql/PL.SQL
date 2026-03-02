-- Stored Procedures for Reset Demo
-- Run this file after sql/DDL.SQL
-- AI was not used for the creation of this file.

DROP PROCEDURE IF EXISTS DemoDeleteArin;

DELIMITER //

CREATE PROCEDURE DemoDeleteArin()
BEGIN
    DELETE FROM Characters
    WHERE characterName = 'Arin';
END //

DELIMITER ;
