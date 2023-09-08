import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";
import { ConfigFormData } from "../../types/configFormData";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
	const body = await readBody<ConfigFormData>(event);
	try {
		const activeUser = await serverSupabaseUser(event);
		if (activeUser?.id != body.activeUser) {
			console.log("bwomp bwomp");
			setResponseStatus(event, 403);
			return {
				statusCode: "403",
				message: "Not Authenticated >:[",
			};
		}
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}

	try {
		await prisma.configs.create({
			data: {
				user_id: body.activeUser,
				symbols: body.symbols,
			},
		});
		setResponseStatus(event, 200);
		return {
			statusCode: "200",
			message: "Config Saved",
		};
	} catch (error) {
		setResponseStatus(event, 500);
		return {
			statusCode: "500",
			message: "Internal Server Error",
		};
	}
});
