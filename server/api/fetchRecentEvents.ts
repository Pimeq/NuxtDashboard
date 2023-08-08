import { serverSupabaseUser } from "#supabase/server";

export interface Root {
	items: string;
	sentiment_score_definition: string;
	relevance_score_definition: string;
	feed: Feed[];
}

export interface Feed {
	title: string;
	url: string;
	time_published: string;
	authors: string[];
	summary: string;
	banner_image: string;
	source: string;
	category_within_source: string;
	source_domain: string;
	topics: Topic[];
	overall_sentiment_score: number;
	overall_sentiment_label: string;
	ticker_sentiment: TickerSentiment[];
}

export interface Topic {
	topic: string;
	relevance_score: string;
}

export interface TickerSentiment {
	ticker: string;
	relevance_score: string;
	ticker_sentiment_score: string;
	ticker_sentiment_label: string;
}

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	try {
		const response = await $fetch(
			`https://www.alphavantage.co/query?limit=10&sort=EARLIEST&function=NEWS_SENTIMENT&apikey=&topics=blockchain`
		);
		return response;
	} catch (error) {
		return error;
	}
});
