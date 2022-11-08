import airDB from 'services/airtableClient';
import Joi from 'joi';
import crypto from 'crypto';
import { hashPassword } from 'utils';

const schema = Joi.object({
  resetToken: Joi.string().required(),
  password: Joi.string().required()
});

const changePassword = async (payload) => {
  const { password, resetToken } = await schema.validateAsync(payload);

  let [user] = await airDB('users')
    .select({ filterByFormula: `resetToken="${resetToken}"` })
    .firstPage();

  if (!user) {
    throw new Error('wrong_token');
  }

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, passwordSalt);

  user = await airDB('users').update([
    {
      id: user.id,
      fields: {
        resetToken: null,
        passwordHash,
        passwordSalt
      }
    }
  ]);

  return {
    id: user[0].id,
    email: user[0].fields.email,
    fullName: user[0].fields.fullName,
    role: user[0].fields.role
  };
};

export default changePassword;
