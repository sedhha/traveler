import admin from '@/backend/supabase';
import { tables } from '@/backend/constants/tables';
import axios from 'axios';

const getResponseFromCache = async (key: string): Promise<string | void> =>
	admin
		.from(tables.cache.name)
		.select(tables.cache.columns.value)
		.eq(tables.cache.columns.key, key)
		.then(({ data, error }) => {
			if (error || !data.length) return;
			return (data[0] as unknown as { value: string }).value;
		});

const callChatGPTClient = async (promptMessage: string): Promise<unknown[]> => {
	// Taking at max 50 characters
	promptMessage = (promptMessage ?? '').slice(0, 50).toLowerCase();
	const cachedResponse = await getResponseFromCache(promptMessage);
	if (
		!cachedResponse &&
		process.env.OPENAI_BASE_URL &&
		process.env.OPENAI_API_KEY
	)
		return axios
			.post(
				process.env.OPENAI_BASE_URL,
				{
					model: 'text-davinci-003',
					prompt:
						'Here\'s a list of JSON with multiple trips created by numerous users: ```[{"tripId":"vervsedfsedjbescsdhvbd","tripName":"Full Moon Party at Phuket","startDate":"2023-07-02T14:26:31.191Z","endDate":"2023-07-06T14:26:31.191Z","description":"We are three guys from Switzerland planning to join the Full Moon Party at Phuket this month. Feel free to join us if you are into water sports and vodka. Looking forward to hear from you guys!","city":"Phuket","country":"Thailand"},{"tripId":"8df7hgd7h6fgh8sdfg","tripName":"Skiing Adventure in Aspen","startDate":"2023-12-10T09:00:00.000Z","endDate":"2023-12-16T16:00:00.000Z","description":"Calling all snow enthusiasts! Join us for an exhilarating skiing adventure in the world-renowned slopes of Aspen. Whether you\'re a beginner or an expert, there\'s something for everyone. Get ready to carve through fresh powder and experience the ultimate winter getaway!","city":"Aspen","country":"United States"},{"tripId":"sdf4s6df4g5d6fg5d6fg","tripName":"Cultural Exploration in Kyoto","startDate":"2024-02-05T11:30:00.000Z","endDate":"2024-02-10T17:30:00.000Z","description":"Immerse yourself in the rich traditions and history of Kyoto, Japan. From serene temples to exquisite gardens, this trip offers a glimpse into the soul of Japanese culture. Join us as we wander through ancient streets and discover the beauty of Kyoto!","city":"Kyoto","country":"Japan"},{"tripId":"8fd7g9df7g6df7g9df7g","tripName":"Island Paradise in Maldives","startDate":"2024-03-20T08:00:00.000Z","endDate":"2024-03-25T18:00:00.000Z","description":"Escape to the breathtaking beauty of the Maldives! Join us on a luxurious island retreat surrounded by crystal-clear waters and pristine white sands. Indulge in relaxation, water sports, and stunning sunsets. Let\'s make unforgettable memories in this tropical paradise!","city":"Maldives","country":"Maldives"},{"tripId":"d6f5d6f8d7f8d76f8gd","tripName":"Road Trip along the Great Ocean Road","startDate":"2024-05-10T06:00:00.000Z","endDate":"2024-05-18T15:00:00.000Z","description":"Embark on an epic road trip adventure along Australia\'s stunning Great Ocean Road. Witness breathtaking coastal landscapes, towering cliffs, and iconic landmarks like the Twelve Apostles. Join our group and let\'s explore the beauty of this scenic route!","city":"Great Ocean Road","country":"Australia"},{"tripId":"7g8df7gd6fg5d6fg5df6","tripName":"Exploring the Ancient Ruins of Athens","startDate":"2024-07-05T10:30:00.000Z","endDate":"2024-07-11T16:30:00.000Z","description":"Step back in time and uncover the wonders of ancient Athens. From the Acropolis to the Parthenon, this trip is a journey through history and mythology. Join us as we immerse ourselves in the birthplace of Western civilization!","city":"Athens","country":"Greece"},{"tripId":"dfg8d7fg6d7fgd6fg7d","tripName":"Safari Adventure in Maasai Mara","startDate":"2024-09-15T07:00:00.000Z","endDate":"2024-09-22T14:00:00.000Z","description":"Embark on an extraordinary safari adventure in the magnificent Maasai Mara National Reserve. Witness the majestic wildlife, from lions to elephants, in their natural habitat. Join our group and let the beauty of Africa\'s wilderness captivate you!","city":"Maasai Mara","country":"Kenya"},{"tripId":"df7gdf6gdf56g7dfg7df","tripName":"Exploring the Wonders of Cappadocia","startDate":"2024-10-18T12:00:00.000Z","endDate":"2024-10-24T19:00:00.000Z","description":"Uncover the enchanting landscapes of Cappadocia, Turkey. From fairy-tale-like rock formations to hot air balloon rides at sunrise, this trip is a visual feast for the senses. Join us as we discover the hidden treasures of this unique destination!","city":"Cappadocia","country":"Turkey"},{"tripId":"fgh8df7gd6fgd6f8d7f","tripName":"Beach Getaway in Tulum","startDate":"2024-11-22T09:30:00.000Z","endDate":"2024-11-28T17:30:00.000Z","description":"Escape to the idyllic shores of Tulum, Mexico. Relax on pristine beaches, explore ancient Mayan ruins, and swim in crystal-clear cenotes. Join our group and experience the perfect blend of relaxation and adventure in this tropical paradise!","city":"Tulum","country":"Mexico"},{"tripId":"8fd7g9df7g6df7g9df7g","tripName":"Winter Wonderland in Lapland","startDate":"2024-12-15T10:00:00.000Z","endDate":"2024-12-22T16:00:00.000Z","description":"Embrace the magic of winter in Lapland, Finland. Experience the Northern Lights, go husky sledding, and visit Santa Claus Village. Join our group and let\'s create unforgettable memories in this winter wonderland!","city":"Lapland","country":"Finland"}]``` Here\'s the prompt message:`' +
						promptMessage +
						'` Can you pick the top 3 results from the JSON array where you are more than 90% confident and if not you can return empty array as well. Note that you need to respond as a JSON data and nothing else.',
					max_tokens: 2000,
					temperature: 0,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			)
			.then(async ({ data }) => {
				try {
					await admin.from(tables.cache.name).insert([
						{
							[tables.cache.columns.key]: promptMessage,
							[tables.cache.columns.value]: data?.choices?.[0]?.text ?? '[]',
						},
					]);

					return JSON.parse(data?.choices?.[0]?.text ?? '[]');
				} catch (err) {
					console.error(
						'Error occured while decoding responde from Open AI - ',
						(err as { message: string }).message
					);
					return [];
				}
			})
			.catch((err) => {
				console.error(
					'Error occured while decoding responde from Open AI - ',
					(err as { message: string }).message
				);
				return [];
			});
	else if (cachedResponse != undefined) {
		try {
			return JSON.parse(cachedResponse);
		} catch (err) {
			console.error(
				'Error occured while decoding responde from cache - ',
				(err as { message: string }).message
			);
			return [];
		}
	}
	return [];
};
export { callChatGPTClient };
