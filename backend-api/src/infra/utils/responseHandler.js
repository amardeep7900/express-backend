function handleResponse(res, { statusCode, data, message, success, }) {
  const response = {
    success: success || false,
    message: message,
    data: data || {},
  };
  return res.status(statusCode).json(response);
}

module.exports = handleResponse;