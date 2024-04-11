const validate = (schema) => async (req, res, next) => {
  try {
    const value = await schema.parseAsync(req.body);
    req.body = value;
    next();
  } catch (err) {
    res.status(422).json({ message: err.errors[0].message });
  }
};
module.exports = validate;
