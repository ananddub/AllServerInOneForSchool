
CREATE TABLE IF NOT EXISTS tbl_adminannounce (
    messageid INT(11) NOT NULL AUTO_INCREMENT,
    message TEXT NULL,
    `to` VARCHAR(200) NULL,
    `from` VARCHAR(200) NULL,
    `date` DATE NULL DEFAULT CURDATE(),
    `time` TIME NULL DEFAULT CURTIME(),
    class VARCHAR(30) NULL,
    sec VARCHAR(30) NULL,
    name VARCHAR(255) NULL,
    fname VARCHAR(255) NULL,
    mclass VARCHAR(10) NULL,
    msec VARCHAR(10) NULL,
    mroll VARCHAR(10) NULL,
    file TEXT NULL,
    PRIMARY KEY (messageid)
);

CREATE TABLE IF NOT EXISTS tbl_stdannounce (
    messageid INT(11) NULL,
    admno VARCHAR(255) NULL,
    name VARCHAR(255) NULL,
    messaged TEXT NULL,
    `to` VARCHAR(10) NULL,
    `from` VARCHAR(10) NULL,
    class VARCHAR(10) NULL,
    sec VARCHAR(10) NULL,
    `date` DATE NULL DEFAULT CURDATE(),
    `time` TIME NULL DEFAULT CURTIME()
);

CREATE TABLE IF NOT EXISTS userlogin (
    username VARCHAR(15) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);


INSERT INTO tbl_stdidcard (admno, imgstatus, active)
    SELECT admno, 0, 1
        FROM tbl_admission
        WHERE active = 1
        AND session = CONCAT(YEAR(CURDATE()), '-', YEAR(CURDATE()) + 1)
        AND NOT EXISTS (SELECT 1 FROM tbl_stdidcard);

CREATE TABLE IF NOT EXISTS tbl_holiday (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin BOOLEAN,
    empid VARCHAR(255) NULL,
    dates DATE,
    approved BOOLEAN,
    rejected BOOLEAN
);


INSERT INTO tbl_stdidcard (admno, imgstatus, active)
    SELECT admno, 0, 1
    FROM tbl_admission
    WHERE active = 1
    AND session = CONCAT(YEAR(CURDATE()), '-', YEAR(CURDATE()) + 1)
    AND NOT EXISTS (SELECT 1 FROM tbl_stdidcard);

ALTER TABLE tbl_empatt 
    ADD latitude INT ,
    ADD longtitude INT;


