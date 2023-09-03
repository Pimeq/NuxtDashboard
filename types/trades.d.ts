export type Trades = Trade[];

export interface Trade {
	id: string;
	created_at: string;
	profit: number;
	trade_id: string;
	direction: string;
}
