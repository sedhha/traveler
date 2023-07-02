import dummyPosts from '@/constants/dummy-posts.json';
const Feed = () => {
	return (
		<div>
			Hello Feed
			<div>
				{dummyPosts.map((post) => (
					<div key={post.tripId}>
						<h1>{post.tripName}</h1>
						<h2>
							Starting At: {new Date(post.startDate).toLocaleDateString()}
						</h2>
						<h2>Ending At: {new Date(post.endDate).toLocaleDateString()}</h2>
						<h3>{post.description}</h3>
					</div>
				))}
			</div>
		</div>
	);
};
export default Feed;
