import { VideoListResponse } from '../types/video';

const API_BASE_URL = 'http://localhost:3000'; // 服务器地址

export const fetchCategories = async (baseUrl: string): Promise<VideoListResponse> => {
  const params = new URLSearchParams({
    baseUrl
  });

  const response = await fetch(`${API_BASE_URL}/api/proxy/vod?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchVideoList = async (
  baseUrl: string,
  page: number = 1,
  typeIds?: number[],
  keyword?: string
): Promise<VideoListResponse> => {
  const params = new URLSearchParams({
    baseUrl,
    ac: 'videolist',
    pg: page.toString()
  });

  if (typeIds && typeIds.length > 0) {
    typeIds.forEach(id => params.append('t', id.toString()));
  }

  if (keyword) {
    params.append('wd', keyword);
  }

  const response = await fetch(`${API_BASE_URL}/api/proxy/vod?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchVideoDetail = async (baseUrl: string, id: number): Promise<VideoListResponse> => {
  const params = new URLSearchParams({
    baseUrl,
    ac: 'videolist',
    ids: id.toString()
  });

  const response = await fetch(`${API_BASE_URL}/api/proxy/vod?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
