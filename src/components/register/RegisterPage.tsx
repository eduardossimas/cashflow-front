import { useState, useContext } from 'react';
import CashFlowPro from '../../assets/CashFlowPro.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext); // Usando o contexto de autenticação
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'andremartins2003@gmail.com' && password === '1234') {
      login(username);
      navigate('/');
    } else {
      setError('Email ou senha incorretos');
    }6
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <form onSubmit={handleSubmit} className='bg-white p-10 rounded-lg shadow-xl'>
        <div className='flex justify-center'>
          <img src={CashFlowPro} alt="Logo" className="w-44 h-9 mb-4" />
        </div>
        {error && (
          <div className='mb-4 text-red-500'>
            {error}
          </div>
        )}
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>Nome</label>
          <input
            type='text'
            id='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='border rounded w-full p-2'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>Email</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='border rounded w-full p-2'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-1'>Senha</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border rounded w-full p-2'
          />
        </div>
        <div className='grid gap-y-4'>
        <button type='submit' className='bg-orange-500 text-white rounded p-2 w-full hover:bg-orange-600'>
          Cadastrar
        </button>
        <a href="/login" className='border text-center text-orange-400 rounded p-2 w-full hover:bg-slate-100'>Já possuo conta</a>
      
        </div>
        </form>
    </div>
  );
}