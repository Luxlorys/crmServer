const handleValidateUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

const handleErrorSave = (error, _, next) => {
  const { code, name } = error;

  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;

  next();
};

module.exports = {
  handleErrorSave,
  handleValidateUpdate,
};
