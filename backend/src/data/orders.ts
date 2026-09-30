// Orders as they come back from the store: parsed JSON, so fields are untyped.
const ORDERS_JSON = `{
	"o-1": { "id": "o-1", "total": 19.9, "currency": "EUR" },
	"o-2": { "id": "o-2", "total": 250, "currency": "USD" }
}`;

const orders = JSON.parse(ORDERS_JSON);

export async function findOrder(id: string) {
	return orders[id];
}
