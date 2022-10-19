import Joi from 'joi';
import airDB from 'services/airtableClient';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().required()
});

const checkEmail = async (email) => {
  const user = await airDB('users')
    .select({
      filterByFormula: `email="${email}"`
    })
    .firstPage();

  if (user && user[0]) {
    throw new Error('email_exists');
  }
};

const create = async (payload) => {
  const { email, fullName, password } = await schema.validateAsync(payload);
  await checkEmail(email);

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
  const user = await airDB('users').create([
    {
      fields: {
        email,
        fullName,
        passwordSalt,
        passwordHash,
        role: 'regular'
      }
    }
  ]);

  return user;
};

export default create;
