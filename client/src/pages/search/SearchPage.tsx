import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  CardFooter, 
  Image, 
  Chip, 
  Spinner,
  Tabs,
  Tab
} from "@heroui/react";
import { useSettings } from '../../context/SettingsContext';
import { fetchVideoList } from '../../services/api';
import { VideoItem } from '../../types/video';

interface SearchResultItem extends VideoItem {
  sourceName: string;
  sourceUrl: string;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { sources } = useSettings();
  const navigate = useNavigate();
  
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const searchAllSources = async () => {
      setLoading(true);
      setError(null);
      setResults([]);

      try {
        const promises = sources.map(async (source) => {
          try {
            const response = await fetchVideoList(source.url, 1, undefined, query);
            return response.list.map(item => ({
              ...item,
              sourceName: source.name,
              sourceUrl: source.url
            }));
          } catch (err) {
            console.error(`Failed to fetch from ${source.name}:`, err);
            return [];
          }
        });

        const allResults = await Promise.all(promises);
        const flatResults = allResults.flat();
        setResults(flatResults);
        
        if (flatResults.length === 0) {
            setError('未找到相关结果');
        }
      } catch (err) {
        console.error(err);
        setError('搜索过程中发生错误');
      } finally {
        setLoading(false);
      }
    };

    searchAllSources();
  }, [query, sources]);

  const handlePlay = (id: number, sourceUrl: string) => {
    // We need to temporarily switch the current source context or pass it to the play page
    // For simplicity, we might need to update the SettingsContext to allow "temporary" source override
    // OR, we can pass the source URL in the navigation state or query param.
    // However, PlayPage currently uses `currentSource` from context.
    // A better approach for PlayPage is to accept a source URL query param, defaulting to context if missing.
    
    // Let's assume we'll update PlayPage to handle sourceUrl query param.
    // But first, let's just navigate.
    // Actually, PlayPage relies on `fetchVideoDetail` which needs the base URL.
    // So we MUST pass the source URL.
    
    // Since PlayPage uses `useSettings().currentSource`, we might need to find the source index 
    // corresponding to this URL and set it, OR update PlayPage to support arbitrary source URL.
    // Updating PlayPage is cleaner.
    
    // For now, let's just navigate and we will update PlayPage next.
    navigate(`/play/${id}?source=${encodeURIComponent(sourceUrl)}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 pt-6">
      <h1 className="text-2xl font-bold mb-6">
        搜索结果: <span className="text-primary">{query}</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Spinner size="lg" label="正在全网搜索..." color="secondary" />
        </div>
      ) : error && results.length === 0 ? (
        <div className="flex justify-center items-center h-[30vh]">
          <p className="text-default-500 text-xl">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((video) => (
            <Card 
              shadow="sm" 
              key={`${video.sourceName}-${video.vod_id}`} 
              isPressable 
              onPress={() => handlePlay(video.vod_id, video.sourceUrl)} 
              className="border-none bg-transparent hover:scale-105 transition-transform duration-200"
            >
              <CardBody className="overflow-visible p-0 relative aspect-[2/3] rounded-lg group">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={video.vod_name}
                  className="w-full object-cover h-full"
                  src={video.vod_pic}
                />
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
                  <Chip size="sm" color="secondary" variant="shadow" className="text-xs h-6">
                    {video.vod_remarks || 'HD'}
                  </Chip>
                  <Chip size="sm" color="primary" variant="solid" className="text-xs h-6">
                    {video.sourceName}
                  </Chip>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </CardBody>
              <CardFooter className="text-small justify-between flex-col items-start px-1 pt-2 pb-0">
                <b className="text-default-900 dark:text-default-100 line-clamp-1 text-lg">{video.vod_name}</b>
                <p className="text-default-500 text-xs">{video.type_name} • {video.vod_year}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
