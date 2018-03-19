const reqHelper = {
    success(res, statusCode, message, payload) {
      if (payload) {
        res.status(statusCode).json(Object.assign({
          status: 'Success',
          message
        }, payload));
      } else {
        res.status(statusCode).json({
          status: 'Success',
          message
        });
      }
    },
    error(res, statusCode, message) {
      res.status(statusCode).json({
        status: 'Failed',
        message
      });
    }
  };

  export default reqHelper;
