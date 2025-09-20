'use client';

import { useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleAuthAction = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLoginMode) {
        // Login com E-mail e Senha
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Cadastro com E-mail e Senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Adiciona o nome ao perfil do usuário
        await updateProfile(userCredential.user, { displayName: name });
      }
      router.push('/'); // Redireciona para a home após o sucesso
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/'); // Redireciona para a home
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'O formato do e-mail é inválido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou senha incorretos.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      default:
        return 'Ocorreu um erro. Tente novamente mais tarde.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black pt-20 px-4">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          {isLoginMode ? 'Entrar na sua conta' : 'Criar uma conta'}
        </h2>
        <p className="text-center text-gray-400 mb-8">Bem-vindo(a) ao TelaOculta</p>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthAction} className="space-y-6">
          {!isLoginMode && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-black bg-white hover:bg-gray-200 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Carregando...' : (isLoginMode ? 'Entrar' : 'Cadastrar')}
            </button>
          </div>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Ou continue com</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-full shadow-sm bg-transparent text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.37 1.62-4.17 1.62-4.97 0-9-4.03-9-9s4.03-9 9-9c2.39 0 4.53.94 6.13 2.5l2.4-2.4C18.99 1.37 15.99 0 12.48 0c-6.63 0-12 5.37-12 12s5.37 12 12 12c6.94 0 11.7-4.7 11.7-11.7 0-.79-.07-1.54-.19-2.28h-11.51z"/></svg>
            Google
          </button>
        </div>
        
        <div className="text-center mt-6">
          <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-sm text-pink-400 hover:text-pink-300">
            {isLoginMode ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}