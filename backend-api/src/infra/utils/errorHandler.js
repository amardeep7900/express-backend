 function throwError ({ code = 500, message, req = {} }) {
  const error = new Error(message);
  error.code = code;
  error.req = req;
  
  throw error;
};
 function formatGQLError (err) {
  const { req = {} } = err.originalError || {};
  const responseData = {
    requestId: req.requestId,
    message: err.message,
    authUser: req.authUser,
    success: false,
    code: (err.originalError && err.originalError.code) || 500,
    locations: err.locations,
    path: err.path,
  };
  return responseData;
};
module.exports={throwError,formatGQLError}