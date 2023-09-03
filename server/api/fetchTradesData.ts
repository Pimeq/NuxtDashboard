import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

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
		const prisma = new PrismaClient();
		const tradesData = await prisma.closedPositions.findMany();

		return JSON.stringify(tradesData, (key, value) =>
			typeof value === "bigint" ? parseInt(value.toString()) : value
		);
	} catch (error) {
		return {
			statusCode: "403",
			msg: "unathorized",
		};
	}
});
