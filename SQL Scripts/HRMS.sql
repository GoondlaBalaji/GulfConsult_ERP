/*
===============================================================================
Project Name : Gulf Consult ERP (GC_ERP)
Module       : HRMS (Human Resource Management System)
Database     : GC_ERP
Author       : Goondla Balaji
Version      : 1.0
Description  : Creates all HRMS master and transaction tables.
===============================================================================
*/

CREATE DATABASE IF NOT EXISTS GC_ERP;
USE GC_ERP;

-- =============================================================================
-- 1. COMPANY MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Company
(
    ccode_int      INT AUTO_INCREMENT,
    cname_vc       VARCHAR(150) NOT NULL,
    address_vc     VARCHAR(250) NOT NULL,

    crby_vc        VARCHAR(50) NOT NULL,
    crdate_dt      DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc       VARCHAR(50),
    moddate_dt     DATETIME DEFAULT CURRENT_TIMESTAMP
                   ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (ccode_int)
);

-- =============================================================================
-- 2. JOB TITLE MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_JobTitles
(
    jcode_int      INT AUTO_INCREMENT,
    jtitle_vc      VARCHAR(150) NOT NULL,
    deleted_int    INT DEFAULT 0,

    crby_vc        VARCHAR(50) NOT NULL,
    crdate_dt      DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc       VARCHAR(50),
    moddate_dt     DATETIME DEFAULT CURRENT_TIMESTAMP
                   ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (jcode_int)
);

-- =============================================================================
-- 3. NATIONALITY MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS gen_nationality
(
    ncode_int      INT AUTO_INCREMENT,
    nname_vc       VARCHAR(50) NOT NULL,
    deleted_int    INT DEFAULT 0,

    crby_vc        VARCHAR(50) NOT NULL,
    crdate_dt      DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc       VARCHAR(50),
    moddate_dt     DATETIME DEFAULT CURRENT_TIMESTAMP
                   ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (ncode_int),
    UNIQUE (nname_vc)
);

-- =============================================================================
-- 4. EDUCATION MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Education
(
    ecode_int      INT AUTO_INCREMENT,
    education_vc   VARCHAR(100) NOT NULL,
    deleted_int    INT DEFAULT 0,

    crby_vc        VARCHAR(50) NOT NULL,
    crdate_dt      DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc       VARCHAR(50),
    moddate_dt     DATETIME DEFAULT CURRENT_TIMESTAMP
                   ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (ecode_int),
    UNIQUE (education_vc)
);

-- =============================================================================
-- 5. DOCUMENT TYPE MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_DocTypes
(
    doctypecode_int    INT AUTO_INCREMENT,
    doctypename_vc     VARCHAR(100) NOT NULL,
    deleted_int        INT DEFAULT 0,

    crby_vc            VARCHAR(50) NOT NULL,
    crdate_dt          DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc           VARCHAR(50),
    moddate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP
                       ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (doctypecode_int),
    UNIQUE (doctypename_vc)
);

-- =============================================================================
-- 6. LEAVE TYPE MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_LeaveTypes
(
    leavecode_int     INT AUTO_INCREMENT,
    leavename_vc      VARCHAR(100) NOT NULL,
    noofdays_int      INT NOT NULL,
    deleted_int       INT DEFAULT 0,

    crby_vc           VARCHAR(50) NOT NULL,
    crdate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc          VARCHAR(50),
    moddate_dt        DATETIME DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (leavecode_int),
    UNIQUE (leavename_vc)
);

-- =============================================================================
-- 7. JOB OPENING LIST
-- =============================================================================
CREATE TABLE IF NOT EXISTS Jobopening_List
(
    jobopen_id        INT AUTO_INCREMENT,
    ccode_int         INT NOT NULL,
    jcode_int         INT NOT NULL,
    noofvacancy_int   INT NOT NULL,
    experience_int    INT,
    salary_from_dc    DECIMAL(10,2),
    salary_to_dc      DECIMAL(10,2),
    location_vc       VARCHAR(100),
    status_vc         VARCHAR(30),

    crby_vc           VARCHAR(50) NOT NULL,
    crdate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc          VARCHAR(50),
    moddate_dt        DATETIME DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (jobopen_id),
    FOREIGN KEY (ccode_int) REFERENCES Gen_Company(ccode_int),
    FOREIGN KEY (jcode_int) REFERENCES Gen_JobTitles(jcode_int)
);

-- =============================================================================
-- 8. NEW JOINER LIST
-- =============================================================================
CREATE TABLE IF NOT EXISTS New_Joiner_List
(
    joiner_id          INT AUTO_INCREMENT,
    employee_name_vc   VARCHAR(100) NOT NULL,
    email_vc           VARCHAR(100),
    mobile_vc          VARCHAR(20),
    jcode_int          INT,
    joiningdate_dt     DATE,
    status_vc          VARCHAR(30),

    crby_vc            VARCHAR(50) NOT NULL,
    crdate_dt          DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc           VARCHAR(50),
    moddate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP
                       ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (joiner_id),
    FOREIGN KEY (jcode_int) REFERENCES Gen_JobTitles(jcode_int)
);

-- =============================================================================
-- 9. EMPLOYEE MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Employee
(
    ecode_nu          BIGINT AUTO_INCREMENT,
    ccode_int         INT NOT NULL,
    empname_vc        VARCHAR(100) NOT NULL,
    gender_vc         VARCHAR(10),
    dob_dt            DATE,
    mobile_vc         VARCHAR(20),
    email_vc          VARCHAR(100),
    address_vc        VARCHAR(255),
    jcode_int         INT,
    ncode_int         INT,
    ecode_int         INT,
    doj_dt            DATE,
    status_vc         VARCHAR(20),

    crby_vc           VARCHAR(50) NOT NULL,
    crdate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc          VARCHAR(50),
    moddate_dt        DATETIME DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (ecode_nu),
    UNIQUE (email_vc),
    FOREIGN KEY (ccode_int) REFERENCES Gen_Company(ccode_int),
    FOREIGN KEY (jcode_int) REFERENCES Gen_JobTitles(jcode_int),
    FOREIGN KEY (ncode_int) REFERENCES gen_nationality(ncode_int),
    FOREIGN KEY (ecode_int) REFERENCES Gen_Education(ecode_int)
);

-- =============================================================================
-- 10. USERS (SECURITY / APPLICATION LOGIN)
-- =============================================================================
CREATE TABLE IF NOT EXISTS Sec_Users
(
    user_id           INT AUTO_INCREMENT,
    ecode_nu          BIGINT NOT NULL,
    username_vc       VARCHAR(50) NOT NULL,
    password_vc       VARCHAR(255) NOT NULL,
    role_vc           VARCHAR(30),
    active_int        INT DEFAULT 1,

    crby_vc           VARCHAR(50) NOT NULL,
    crdate_dt         DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc          VARCHAR(50),
    moddate_dt        DATETIME DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id),
    UNIQUE (username_vc),
    UNIQUE (ecode_nu),
    FOREIGN KEY (ecode_nu) REFERENCES Gen_Employee(ecode_nu)
);

-- =============================================================================
-- 11. EMPLOYEE DOCUMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS Doc_File_Path
(
    sfpath_id          INT AUTO_INCREMENT,
    ecode_nu           BIGINT NOT NULL,
    doctypecode_int    INT NOT NULL,
    filepath_vc        VARCHAR(255) NOT NULL,
    upload_dt          DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (sfpath_id),
    FOREIGN KEY (ecode_nu) REFERENCES Gen_Employee(ecode_nu),
    FOREIGN KEY (doctypecode_int) REFERENCES Gen_DocTypes(doctypecode_int)
);
