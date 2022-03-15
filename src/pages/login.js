import { delay } from 'helper/utils';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Login() {
  const [loading, setLoading] = useState(false);
  const [pid, setPid] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleChange = (e, type) => {
    if (type === 'pid') {
      setPid(e.target.value);
    }
    if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = {
        personal_id: pid,
        password,
        callbackUrl: `${window.location.origin}`,
      };
      const result = await signIn('credentials', { redirect: false, ...values });
      await delay(100).then(() => setLoading(false));
      if (result?.url) {
        router.push(result?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-slate-300 rounded-lg space-y-8 p-8">
        <p className="text-center uppercase text-3xl font-semibold">Paycheck portal</p>
        <div className="grid grid-cols-12 gap-x-2 gap-y-3 items-center max-w-3xl w-full">
          <p className="col-span-4">ID:</p>
          <input
            type="text"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'pid')}
          />
          <p className="col-span-4">Password:</p>
          <input
            type="password"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'password')}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 btn-primary rounded-md uppercase"
          onClick={handleSubmit}
          disabled={loading}
        >
          login
        </button>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const csrfToken = await getCsrfToken(context);
//   return { props: { csrfToken } };
// }

export default Login;
