export enum DbTables {
	SCHOOL = "[sems_demo].[dbo].[tbl_school]",
	LEVEL = "[sems_demo].[dbo].[tbl_level]",
	SPECIALISATION = "[sems_demo].[dbo].[tbl_specialisation]",
	STUDENT = "[sems_demo].[dbo].[tbl_student]",
	ORGANISER = "[sems_demo].[dbo].[tbl_organiser]",
	PARTICIPATION = "[sems_demo].[dbo].[tbl_participation]",
	EVENT = "[sems_demo].[dbo].[tbl_event]",
	FEEDBACK = "[sems_demo].[dbo].[tbl_feedback]",
}

export enum StatusCodes {
	OK = 200, // Request succeeded
	CREATED = 201, // New resource was created
	NO_CONTENT = 204, // The action has been performed but the response does not include an entity.
	BAD_REQUEST = 400, // Used when params are not found in query
	UNAUTHORISED = 401, // Used when client's identity is not known to server
	FORBIDDEN = 403, // Used when client's identity is known to server
	NOT_FOUND = 404, // Server cannot find the requested resource
	INTERNAL_SERVER_ERROR = 500, // Server encountered a situation it does not know how to handle
}
