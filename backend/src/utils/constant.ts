export enum DbTables {
	DISCIPLINE = "[sems_demo].[dbo].[tbl_discipline]",
	EVENT = "[sems_demo].[dbo].[tbl_event]",
	ORGANISER = "[sems_demo].[dbo].[tbl_organiser]",
	PARTICIPATION = "[sems_demo].[dbo].[tbl_participation]",
	SCHOOL = "[sems_demo].[dbo].[tbl_school]",
	STUDENT = "[sems_demo].[dbo].[tbl_student]",
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
