/*
===============================================================================
Project Name : Gulf Consult ERP (GC_ERP)
Module       : TSMS (Time Sheet Management System)
Database     : GC_ERP
Author       : Goondla Balaji
Version      : 1.0
Description  : Creates all TSMS master and transaction tables.
===============================================================================
*/

CREATE DATABASE IF NOT EXISTS GC_ERP;
USE GC_ERP;

-- =============================================================================
-- 1. PROJECT MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Projects
(
    projectcode_int      INT AUTO_INCREMENT,
    projectname_vc       VARCHAR(150) NOT NULL,
    clientname_vc        VARCHAR(150),
    startdate_dt         DATE,
    enddate_dt           DATE,
    status_vc            VARCHAR(30),
    deleted_int          INT DEFAULT 0,

    crby_vc              VARCHAR(50) NOT NULL,
    crdate_dt            DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc             VARCHAR(50),
    moddate_dt           DATETIME DEFAULT CURRENT_TIMESTAMP
                         ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (projectcode_int)
);

-- =============================================================================
-- 2. EMPLOYEE TIME TRACK DETAILS
-- =============================================================================
CREATE TABLE IF NOT EXISTS Emp_TimeTrack_Details
(
    timetrack_id         INT AUTO_INCREMENT,
    ecode_nu             BIGINT NOT NULL,
    projectcode_int      INT NOT NULL,
    workdate_dt          DATE NOT NULL,
    hoursworked_dc       DECIMAL(5,2) NOT NULL,
    taskdescription_vc   VARCHAR(255),
    status_vc            VARCHAR(30),

    crby_vc              VARCHAR(50) NOT NULL,
    crdate_dt            DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc             VARCHAR(50),
    moddate_dt           DATETIME DEFAULT CURRENT_TIMESTAMP
                         ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (timetrack_id),
    FOREIGN KEY (ecode_nu) REFERENCES Gen_Employee(ecode_nu),
    FOREIGN KEY (projectcode_int) REFERENCES Gen_Projects(projectcode_int)
);

-- =============================================================================
-- 3. EMPLOYEE TIME SHEET DETAILS
-- =============================================================================
CREATE TABLE IF NOT EXISTS Emp_Time_Sheet_Details
(
    timesheet_id         INT AUTO_INCREMENT,
    ecode_nu             BIGINT NOT NULL,
    month_int            INT NOT NULL,
    year_int             INT NOT NULL,
    totalhours_dc        DECIMAL(6,2),
    approvalstatus_vc    VARCHAR(30),
    approvedby_vc        VARCHAR(50),
    approveddate_dt      DATETIME,

    crby_vc              VARCHAR(50) NOT NULL,
    crdate_dt            DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc             VARCHAR(50),
    moddate_dt           DATETIME DEFAULT CURRENT_TIMESTAMP
                         ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (timesheet_id),
    FOREIGN KEY (ecode_nu) REFERENCES Gen_Employee(ecode_nu)
);
