export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (process.env.NODE_ENV === 'development') devError(res, err);
	if (process.env.NODE_ENV === 'production') prodError(res, err);
};

const devError = (res, err) => {};
const prodError = (res, err) => {};
