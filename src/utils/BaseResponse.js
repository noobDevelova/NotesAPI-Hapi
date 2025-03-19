class BaseResponse {
  static create({ status, message, data }) {
    return {
      status,
      message,
      data,
    };
  }
}

module.exports = BaseResponse;
