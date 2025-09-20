import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 text-gray-400 mt-16">
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/movies" className="hover:text-white transition-colors">Filmes</Link></li>
              <li><Link href="/series" className="hover:text-white transition-colors">Séries</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Nosso Parceiro</h3>
            <p className="mb-4">Veja também o site do nosso parceiro CineVEO.</p>
            <a href="https://cineveo.lat" target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-600 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-700 transition-colors">
              Acessar CineVEO
            </a>
          </div>
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white text-lg mb-4">Aviso Legal</h3>
            <p className="text-sm">
              Este Site Não Hospeda Nada e Não Existe Nenhum Servidor Em Seu Nome, Apenas Pegamos Players De Plataformas Que Disponibilizam Os Embeds Dos Players.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 TelaOculta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}