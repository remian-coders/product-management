import axios from 'axios';

const getBaseUrl = () => {
	let url;
	switch (process.env.NODE_ENV) {
		case 'production':
			url = 'http://54.180.106.136:5000/api';
			break;
		case 'development':
		default:
			url = 'http://localhost:5000/api';
	}

	return url;
};

export default axios.create({
	baseURL: getBaseUrl(),
});
