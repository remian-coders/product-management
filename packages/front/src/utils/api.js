import axios from 'axios';

const getBaseUrl = () => {
	let url;
	switch (process.env.NODE_ENV) {
		case 'production':
			// url = "http://192.168.0.197:5000/api";
			url = 'http://localhost:5000/api';
			break;
		case 'development':
		default:
			// url = 'http://192.168.0.197:5000/api';
			url = 'http://localhost:5000/api';
	}

	return url;
};

export default axios.create({
	baseURL: getBaseUrl(),
});
