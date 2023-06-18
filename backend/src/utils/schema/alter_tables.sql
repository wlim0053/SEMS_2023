USE sems_demo;
BEGIN
    ALTER TABLE tbl_user
    ADD FOREIGN KEY (spec_uuid) REFERENCES tbl_specialisation (spec_uuid);
END

BEGIN
    ALTER TABLE tbl_specialisation
    ADD FOREIGN KEY (school_uuid) REFERENCES tbl_school (school_uuid);
END

BEGIN
    ALTER TABLE tbl_organiser
    ADD FOREIGN KEY (user_fire_id) REFERENCES tbl_user (user_fire_id);
END

BEGIN
    ALTER TABLE tbl_event
    ADD FOREIGN KEY (organiser_uuid) REFERENCES tbl_organiser (organiser_uuid);
END

BEGIN
    ALTER TABLE tbl_participation
    ADD FOREIGN KEY (event_uuid) REFERENCES tbl_event (event_uuid),
        FOREIGN KEY (user_fire_id) REFERENCES tbl_user (user_fire_id)
END

BEGIN
    ALTER TABLE tbl_feedback
    ADD FOREIGN KEY (participation_uuid) REFERENCES tbl_participation (participation_uuid);
END