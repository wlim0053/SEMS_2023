UPDATE [sems_demo].[dbo].[tbl_school]
SET [school_name] = @school_name
WHERE [school_uuid] = @school_uuid

SELECT [school_uuid]
        , [school_name]
FROM [sems_demo].[dbo].[tbl_school]
WHERE [school_uuid] = @school_uuid