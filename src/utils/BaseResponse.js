class BaseResponse {
  static create({ status, message, data = null }) {
    return {
      status,
      message,
      data,
    };
  }
}

module.exports = BaseResponse;
