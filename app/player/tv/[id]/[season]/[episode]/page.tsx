import { getSeriesDetails, getRecommendations } from '@/lib/tmdb';
import Player from '@/components/Player';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

// Componente que busca os dados da série e as recomendações
async function SeriesPlayer({ id, season, episode }: { id: string, season: string, episode: string }) {
    const numericId = Number(id);
    const series = await getSeriesDetails(numericId);
    // Busca as recomendações para a série atual
    const recommendations = await getRecommendations('tv', numericId);
    
    const seriesTitle = series.name ? `${series.name} - T${season} E${episode}` : `Série - T${season} E${episode}`;
    
    return (
        <Player 
            mediaType="tv"
            id={id}
            season={season}
            episode={episode}
            title={seriesTitle}
            recommendations={recommendations} // Passa as recomendações para o player
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