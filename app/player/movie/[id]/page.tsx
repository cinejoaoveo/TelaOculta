import { getMovieDetails } from '@/lib/tmdb';
import Player from '@/components/Player';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

// Componente que busca os dados do filme
async function MoviePlayer({ id }: { id: string }) {
    const movie = await getMovieDetails(Number(id));
    return (
        <Player 
            mediaType="movie"
            id={id}
            title={movie.title || 'Filme'}
        />
    );
}


// A página que será renderizada
export default function MoviePlayerPage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
            <MoviePlayer id={params.id} />
        </Suspense>
    );
}