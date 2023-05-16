IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'sems_demo')
BEGIN
    CREATE DATABASE sems_demo
END