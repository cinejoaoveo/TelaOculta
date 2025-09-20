import { getSeriesDetails } from '@/lib/tmdb';
import Player from '@/components/Player';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

// Componente que busca os dados da série
async function SeriesPlayer({ id, season, episode }: { id: string, season: string, episode: string }) {
    const series = await getSeriesDetails(Number(id));
    const seriesTitle = series.name ? `${series.name} - T${season} E${episode}` : `Série - T${season} E${episode}`;
    return (
        <Player 
            mediaType="tv"
            id={id}
            season={season}
            episode={episode}
            title={seriesTitle}
        />
    );
}

// A página que será renderizada
export default function SeriesPlayerPage({ params }: { params: { id: string, season: string, episode: string }}) {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loading /></div>}>
            <SeriesPlayer id={params.id} season={params.season} episode={params.episode} />
        </Suspense>
    );
}