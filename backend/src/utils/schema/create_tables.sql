USE sems_demo;
IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_user' AND xtype='U')
BEGIN
    CREATE TABLE tbl_user(
        user_fire_id VARCHAR(255) PRIMARY KEY,
        spec_uuid UNIQUEIDENTIFIER,
        user_email VARCHAR(255) NOT NULL,
        user_fname VARCHAR(255),
        user_lname VARCHAR(255),
        user_id INT,
        user_gender TINYINT CHECK (user_gender IN (0,1)),
        user_access_lvl CHAR(1) NOT NULL CHECK (user_access_lvl IN ('A', 'O', 'S')) DEFAULT 'S',
        enrolment_year DATE,
        enrolment_intake TINYINT CHECK (enrolment_intake IN (2, 7, 10)),
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
        user_fire_id VARCHAR(255),
        parent_uuid UNIQUEIDENTIFIER,
        organiser_name VARCHAR(255) NOT NULL
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
        event_mode CHAR(1) NOT NULL CHECK (event_mode IN ('P', 'V', 'H')), -- physical, virtual, hybrid
        event_venue VARCHAR(255) NOT NULL,
        event_capacity INT NOT NULL,
        event_status CHAR(1) NOT NULL CHECK(event_status IN ('D', 'P', 'A', 'R')), -- draft, pending, approved, rejected
        event_reg_start_date SMALLDATETIME,
        event_reg_end_date SMALLDATETIME,
        event_reg_google_form VARCHAR(255)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_participation' AND xtype='U')
BEGIN
    CREATE TABLE tbl_participation(
        participation_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        event_uuid UNIQUEIDENTIFIER NOT NULL,
        user_fire_id VARCHAR(255) NOT NULL,
        participation_attendance BIT NOT NULL DEFAULT 0,
        CONSTRAINT UC_tbl_participation UNIQUE (event_uuid, user_fire_id)
    )
END

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='tbl_feedback' AND xtype='U')
BEGIN
    CREATE TABLE tbl_feedback(
        feedback_uuid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        participation_uuid UNIQUEIDENTIFIER NOT NULL UNIQUE,
        feedback_comm TINYINT NOT NULL,
        feedback_proj TINYINT NOT NULL,
        feedback_solve TINYINT NOT NULL,
        feedback_teamwork TINYINT NOT NULL,
        feedback_reflection VARCHAR(255) NOT NULL
    )
END