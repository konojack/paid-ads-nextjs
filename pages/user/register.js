import BaseLayout from 'components/BaseLayout';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function OfferNew() {
  const [formProcessing, setFormProcessing] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const createUserForm = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);

    const form = new FormData(createUserForm.current);

    const payload = {
      email: form.get('email'),
      fullName: form.get('fullName'),
      password: form.get('password')
    };

    if (payload.password !== form.get('confirmPassword')) {
      setError('Passwords are not the same!');
      setFormProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setFormProcessing(false);
      if (response.ok) {
        router.push('/');
      } else {
        const payload = await response.json();
        setFormProcessing(false);
        setError(payload.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BaseLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Create new user
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form ref={createUserForm} className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="category" className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="title" className="leading-7 text-sm text-gray-600">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="location" className="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="price" className="leading-7 text-sm text-gray-600">
                    Confirm password
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  disabled={formProcessing}
                  className="disabled:opacity-50 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  {formProcessing ? 'Please wait...' : 'Register'}
                </button>

                {error && (
                  <div className="flex justify-center w-full my-5">
                    <span className="bg-red-600 w-full rounded text-white">
                      Offer not added: {error}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
