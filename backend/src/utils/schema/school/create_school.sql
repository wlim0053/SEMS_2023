INSERT INTO [sems_demo].[dbo].[tbl_school]
    (
        [school_uuid],
        [school_name]
    )
VALUES (
    DEFAULT,
    @school_name
)

SELECT [school_uuid]
        , [school_name]
FROM [sems_demo].[dbo].[tbl_school]
WHERE [school_name] = @school_name


