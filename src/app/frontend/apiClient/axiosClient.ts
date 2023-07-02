import axios from 'axios';

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
	timeout: 25000, // Set the request timeout in milliseconds
	headers: {
		'Content-Type': 'application/json', // Set the content type header
		// Add any other headers as needed
	},
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => config,
	(error) => {
		// Handle request error
		console.error('Caused Error while trying to make request', error);
		return Promise.reject(error);
	}
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		// Modify the response data before resolving
// 		console.log('Response Interceptor');
// 		return response;
// 	},
// 	(error) => {
// 		// Handle response error
// 		console.error('Response Interceptor Error:', error);
// 		return Promise.reject(error);
// 	}
// );

export { axiosInstance };
