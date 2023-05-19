USE sems_demo;
IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_student' AND xtype='U')
BEGIN
    CREATE TABLE tbl_student(
        stu_fire_id VARCHAR(255) PRIMARY KEY,
        spec_uuid UNIQUEIDENTIFIER,
        stu_email VARCHAR(255) NOT NULL,
        stu_name VARCHAR(255) NOT NULL,
        stu_id INT,
        stu_gender INT CHECK (stu_gender IN (0,1)),
        enrolment_year DATE,
        enrolment_intake INT CHECK (enrolment_intake IN (2, 7, 10)),
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_school' AND xtype='U')
BEGIN
    CREATE TABLE tbl_school(
        school_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        school_name VARCHAR(255) NOT NULL UNIQUE
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_specialisation' AND xtype='U')
BEGIN
    CREATE TABLE tbl_specialisation(
        spec_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        school_uuid UNIQUEIDENTIFIER NOT NULL, 
        spec_level CHAR(2) NOT NUll CHECK(spec_level IN ('UG', 'PG')),
        spec_name VARCHAR(255) NOT NULL,
        CONSTRAINT UC_tbl_specialisation UNIQUE (spec_name, school_uuid)
    )
END


IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_organiser' AND xtype='U')
BEGIN
    CREATE TABLE tbl_organiser(
        organiser_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        stu_fire_id VARCHAR(255),
        parent_uuid UNIQUEIDENTIFIER,
        organiser_name VARCHAR(255) NOT NULL,
        CONSTRAINT UC_tbl_organiser UNIQUE(organiser_name, stu_fire_id)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_event' AND xtype='U')
BEGIN
    CREATE TABLE tbl_event(
        event_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        organiser_uuid UNIQUEIDENTIFIER NOT NULL,
        event_ems_no VARCHAR(255),
        event_start_date SMALLDATETIME NOT NULL,
        event_end_date SMALLDATETIME NOT NULL,
        event_title VARCHAR(255) NOT NULL,
        event_desc VARCHAR(255) NOT NULL,
        event_mode CHAR(1) NOT NULL CHECK (event_mode IN ('P', 'V', 'H')),
        event_venue VARCHAR(255) NOT NULL,
        event_capacity INT NOT NULL,
        event_status CHAR(1) NOT NULL CHECK(event_status IN ('D', 'P', 'A', 'R')),
        event_reg_start_date SMALLDATETIME,
        event_reg_end_date SMALLDATETIME,
        event_reg_google_form VARCHAR(255)
        CONSTRAINT UC_tbl_event UNIQUE(organiser_uuid, event_ems_no, event_start_date)
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

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_feedback' AND xtype='U')
BEGIN
    CREATE TABLE tbl_feedback(
        feedback_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        participation_uuid UNIQUEIDENTIFIER NOT NULL UNIQUE,
        feedback_comm INT NOT NULL,
        feedback_proj INT NOT NULL,
        feedback_solve INT NOT NULL,
        feedback_teamwork INT NOT NULL,
        feedback_reflection VARCHAR(255) NOT NULL
    )
END