export default abstract class ApiConnector {
	constructor(private apiRoot: string) {}

	async getAll<T>() {
		const getAllApiCall = await fetch(`${this.apiRoot}`, { method: "GET" });
		return (await getAllApiCall.json()) as T[];
	}
}
