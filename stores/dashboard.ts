import { PrismaClient } from "@prisma/client";
import { defineStore } from "pinia";
const prisma = new PrismaClient();

export const useDashboardStore = defineStore("dashboard", {
	state: () => ({
		activeUsers: 0,
	}),
	getters: {
		getActiveUsers: (activeUsers) => activeUsers,
	},
	actions: {
		async fetchActiveUsers() {
			this.activeUsers = await prisma.users.count();
		},
	},
});
