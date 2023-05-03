USE sems_demo;
BEGIN
    ALTER TABLE tbl_student
    ADD FOREIGN KEY (dis_uuid) REFERENCES tbl_discipline (dis_uuid);
END

BEGIN
    ALTER TABLE tbl_discipline
    ADD FOREIGN KEY (school_uuid) REFERENCES tbl_school (school_uuid);
END

BEGIN
    ALTER TABLE tbl_organiser
    ADD FOREIGN KEY (stu_fire_id) REFERENCES tbl_student (stu_fire_id);
END

BEGIN
    ALTER TABLE tbl_event
    ADD FOREIGN KEY (organiser_uuid) REFERENCES tbl_organiser (organiser_uuid);
END

BEGIN
    ALTER TABLE tbl_registration
    ADD FOREIGN KEY (event_uuid) REFERENCES tbl_event (event_uuid);
END

BEGIN
    ALTER TABLE tbl_participation
    ADD FOREIGN KEY (event_uuid) REFERENCES tbl_event (event_uuid),
        FOREIGN KEY (stu_fire_id) REFERENCES tbl_student (stu_fire_id)
END