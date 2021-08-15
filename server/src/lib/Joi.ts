import Joi from 'joi';

export default Joi.defaults(schema =>
  schema.options({ stripUnknown: true, abortEarly: false })
);
