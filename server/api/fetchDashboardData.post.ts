import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const dashboardData = {
		userCount: 0,
		closedUserTrades: 0,
		symbolData: [],
	};

	try {
		const activeUser = await serverSupabaseUser(event);

		dashboardData.userCount = JSON.parse(
			JSON.stringify(await prisma.users.count(), (key, value) =>
				typeof value === "bigint" ? parseInt(value.toString()) : value
			)
		);

		dashboardData.userCount = JSON.parse(
			JSON.stringify(
				await prisma.closedPositions.count({
					where: {
						user_id: activeUser?.id,
					},
				}),
				(key, value) =>
					typeof value === "bigint" ? parseInt(value.toString()) : value
			)
		);

		return dashboardData;
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}
});
