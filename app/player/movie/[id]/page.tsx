import { getMovieDetails, getRecommendations } from '@/lib/tmdb';
import Player from '@/components/Player';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

// Componente que busca os dados do filme e as recomendações
async function MoviePlayer({ id }: { id: string }) {
    const numericId = Number(id);
    const movie = await getMovieDetails(numericId);
    // Busca as recomendações para o filme atual
    const recommendations = await getRecommendations('movie', numericId);
    
    return (
        <Player 
            mediaType="movie"
            id={id}
            title={movie.title || 'Filme'}
            recommendations={recommendations} // Passa as recomendações para o player
        />
    );
}

// A página que será renderizada
export default function MoviePlayerPage({ 
    params 
}: { 
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
            <MoviePlayer id={params.id} />
        </Suspense>
    );
}