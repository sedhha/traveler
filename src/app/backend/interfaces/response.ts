export interface IResponse<JsonBody> {
	body?: JsonBody;
	init?: ResponseInit;
}
