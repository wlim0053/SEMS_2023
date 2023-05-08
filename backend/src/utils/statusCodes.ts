export enum StatusCodes {
	OK = 200, // Request succeeded
	CREATED = 201, // New resource was created
	BAD_REQUEST = 400, // Used when params are not found in query
	UNAUTHORISED = 401, // Used when client's identity is not known to server
	FORBIDDEN = 403, // Used when client's identity is known to server
	NOT_FOUND = 404, // Server cannot find the requested resource
	INTERNAL_SERVER_ERROR = 500, // Server encountered a situation it does not know how to handle
}
