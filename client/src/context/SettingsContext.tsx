import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category } from '../types/video';
import { fetchCategories } from '../services/api';

export interface ApiSource {
  name: string;
  url: string;
}

interface SettingsContextType {
  sources: ApiSource[];
  currentSourceIndex: number;
  currentSource: ApiSource;
  categories: Category[];
  addSource: (source: ApiSource) => void;
  removeSource: (index: number) => void;
  setCurrentSourceIndex: (index: number) => void;
}

const defaultSources: ApiSource[] = [];

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sources, setSources] = useState<ApiSource[]>(() => {
    const saved = localStorage.getItem('reelFlix_sources');
    return saved ? JSON.parse(saved) : defaultSources;
  });

  const [currentSourceIndex, setCurrentSourceIndex] = useState<number>(() => {
    const saved = localStorage.getItem('reelFlix_currentSourceIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [categories, setCategories] = useState<Category[]>([]);

  // 添加保护措施处理空源的情况
  const currentSource = sources.length > 0 ? (sources[currentSourceIndex] || sources[0]) : { name: '', url: '' };

  useEffect(() => {
    localStorage.setItem('reelFlix_sources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('reelFlix_currentSourceIndex', currentSourceIndex.toString());
  }, [currentSourceIndex]);

  useEffect(() => {
    const fetchSourceCategories = async () => {
      // 如果没有可用的源或当前源无效，清空分类并返回
      if (sources.length === 0 || !currentSource?.url) {
        setCategories([]);
        return;
      }

      const cacheKey = `reelFlix_categories_${currentSource.url}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          setCategories(JSON.parse(cached));
          return;
        } catch (e) {
          console.error("Failed to parse cached categories", e);
          localStorage.removeItem(cacheKey);
        }
      }

      try {
        const res = await fetchCategories(currentSource.url);
        if (res.class) {
          setCategories(res.class);
          localStorage.setItem(cacheKey, JSON.stringify(res.class));
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      }
    };

    fetchSourceCategories();
  }, [currentSource, sources.length]);

  const addSource = (source: ApiSource) => {
    setSources([...sources, source]);
  };

  const removeSource = (index: number) => {
    const newSources = sources.filter((_, i) => i !== index);
    setSources(newSources);
    
    // 如果删除后没有源了，将当前源索引设为0
    if (newSources.length === 0) {
      setCurrentSourceIndex(0);
    } else if (currentSourceIndex >= index && currentSourceIndex > 0) {
      setCurrentSourceIndex(currentSourceIndex - 1);
    }
  };

  return (
    <SettingsContext.Provider value={{ 
      sources, 
      currentSourceIndex, 
      currentSource, 
      categories,
      addSource, 
      removeSource, 
      setCurrentSourceIndex 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
