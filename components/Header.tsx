'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Media, getImageUrl, searchMedia } from '@/lib/tmdb';

// Ícone de Lupa
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lógica da Busca com Sugestões
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<Media[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const term = searchTerm.trim();
    if (term.length > 2) {
      setIsSearching(true);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchMedia(term);
        setSuggestions(results.slice(0, 5)); // Limita a 5 sugestões
        setIsSearching(false);
      }, 300); // Debounce de 300ms
    } else {
      setSuggestions([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/movies', label: 'Filmes' },
    { path: '/series', label: 'Séries' },
    { path: '/animacoes', label: 'Animações' },
    { path: '/animes', label: 'Animes' },
    { path: '/novelas', label: 'Novelas' },
    { path: '/doramas', label: 'Doramas' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="https://i.ibb.co/WvnXkwYy/9b7b84f4-71a7-41d5-b1d4-cf3a2c7ef1b9.png" 
              alt="TelaOculta Logo" 
              width={192} height={53}
              className="w-48 h-auto"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex flex-grow justify-center">
          <div className="flex items-center space-x-1 bg-gray-900 px-3 py-2 rounded-full">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200">
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex-shrink-0 flex items-center space-x-4">
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="q"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Atraso para permitir o clique
                placeholder="Pesquisar..."
                className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-full py-2 pl-10 pr-4 focus:ring-pink-500 focus:border-pink-500 w-48"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></div>
            </form>
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                {isSearching ? <div className="p-4 text-center text-gray-400">Buscando...</div> :
                  <ul>
                    {suggestions.map(item => (
                      <li key={item.id}>
                        <Link href={`/${item.media_type}/${item.id}`} onClick={handleSuggestionClick} className="flex items-center p-2 hover:bg-gray-700 transition-colors">
                          <Image src={getImageUrl(item.poster_path, 'w500')} alt={item.title || item.name || ''} width={40} height={60} className="w-10 h-auto rounded-sm" />
                          <span className="ml-3 text-sm text-white">{item.title || item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
              </div>
            )}
          </div>
          <div>
            <Link href="/auth" className="text-gray-300 hover:text-white font-semibold">
              Minha Conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}