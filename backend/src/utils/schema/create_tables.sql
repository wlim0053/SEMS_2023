USE sems_demo;
IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_student' AND xtype='U')
BEGIN
    CREATE TABLE tbl_student(
        stu_fire_id VARCHAR(255) PRIMARY KEY,
        stu_email VARCHAR(255) NOT NULL,
        stu_name VARCHAR(255) NOT NULL,
        stu_id INT,
        enrolment_year DATE,
        enrolment_intake INT CHECK (enrolment_intake IN (2, 7, 10)),
        stu_gender INT NOT NULL CHECK (stu_gender IN (0,1)),
        dis_uuid UNIQUEIDENTIFIER NOT NULL
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_school' AND xtype='U')
BEGIN
    CREATE TABLE tbl_school(
        school_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        school_name VARCHAR(255) NOT NULL UNIQUE
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_discipline' AND xtype='U')
BEGIN
    CREATE TABLE tbl_discipline(
        dis_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        dis_name VARCHAR(255) NOT NULL,
        school_uuid UNIQUEIDENTIFIER NOT NULL, 
        CONSTRAINT UC_tbl_discipline UNIQUE (dis_name, school_uuid)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_organiser' AND xtype='U')
BEGIN
    CREATE TABLE tbl_organiser(
        organiser_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        parent_uuid UNIQUEIDENTIFIER,
        organiser_name VARCHAR(255) NOT NULL,
        stu_fire_id VARCHAR(255)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_event' AND xtype='U')
BEGIN
    CREATE TABLE tbl_event(
        event_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        event_ems_no VARCHAR(255),
        organiser_uuid UNIQUEIDENTIFIER NOT NULL,
        event_start_date SMALLDATETIME NOT NULL,
        event_end_date SMALLDATETIME NOT NULL,
        event_id VARCHAR(255) NOT NULL,
        event_title VARCHAR(255) NOT NULL,
        event_desc VARCHAR(255) NOT NULL,
        event_venue VARCHAR(255) NOT NULL,
        event_capacity INT NOT NULL,
        event_status VARCHAR(255) NOT NULL DEFAULT 'PENDING' CHECK(event_status IN ('DRAFT', 'PENDING', 'APPROVED')),
        constraint UC_tbl_event UNIQUE(organiser_uuid, event_ems_no, event_start_date)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_registration' AND xtype='U')
BEGIN
    CREATE TABLE tbl_registration(
        reg_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        event_uuid UNIQUEIDENTIFIER NOT NULL,
        reg_start_date SMALLDATETIME NOT NULL,
        reg_end_date SMALLDATETIME NOT NULL,
        reg_google_form VARCHAR(255) NOT NULL UNIQUE
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_participation' AND xtype='U')
BEGIN
    CREATE TABLE tbl_participation(
        participation_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        event_uuid UNIQUEIDENTIFIER NOT NULL,
        stu_fire_id VARCHAR(255) NOT NULL,
        CONSTRAINT UC_tbl_participation UNIQUE (event_uuid, stu_fire_id)
    )
END