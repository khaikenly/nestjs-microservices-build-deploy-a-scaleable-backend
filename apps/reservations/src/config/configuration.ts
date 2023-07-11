import * as Joi from 'joi';

export default () => ({
  envFilePath: ['.env', '.env.development'],
  isGlobal: true,
  validationSchema: Joi.object({
    MONGODB_URI: Joi.string().required(),
  }),
});
