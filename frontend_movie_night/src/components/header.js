module.exports = class Header {
  static header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  };
};
