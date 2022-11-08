import crypto from 'crypto';

export const jsonFetcher = (url) => fetch(url).then((res) => res.json());

export const hashPassword = (password, passwordSalt = crypto.randomBytes(16).toString('hex')) => {
  return crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString('hex');
};

export const uploadImage = async (file) => {
  let response = await fetch('/api/upload');
  let data = await response.json();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', data.api_key);
  formData.append('timestamp', data.timestamp);
  formData.append('signature', data.sig);

  response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  data = response.json();

  return data;
};
