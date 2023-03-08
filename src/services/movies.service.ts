import { appConfig } from '../config/app.config';

interface omdbSearchParams {
  apiKey: string;
  type: 'movie' | 'series' | 'episode';
  s: string;
  page?: string;
}

export const getMovies = async (title: string, page?: string) => {
  try {
    const params: omdbSearchParams = {
      apiKey: appConfig.omdbApiKey,
      type: 'movie',
      s: title,
      page: page ?? '1',
    };
    const searchparams: string = new URLSearchParams({ ...params }).toString();

    const response = await fetch(`${appConfig.omdbApiUrl}/?${searchparams}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error searching movies by title: ${error.message}`);
  }
};
