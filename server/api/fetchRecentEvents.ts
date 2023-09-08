import { serverSupabaseUser } from "#supabase/server";

import { RecentEvents } from "../../types/recentEvents";

export default defineEventHandler(async (event) => {
	try {
		const activeUser = await serverSupabaseUser(event);
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}
	try {
		const response: RecentEvents = await $fetch(
			`https://www.alphavantage.co/query?limit=10sort=LATEST&function=NEWS_SENTIMENT&apikey=&topics=blockchain`
		);
		return response;
	} catch (error) {
		return {
			msg: "unathorized",
		};
	}
});
