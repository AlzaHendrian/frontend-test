import request from '@/utils/request';

export const getArticles = async (page, limit, search) => {
    try {
      const response = await request('/articles', {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  };

export const createArticle = async (article) => {
    try {
        const response = await request.post('/article', article);
        return response.data;
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
};

export const getArticleById = async (id) => {
    try {
      const response = await request.get(`/article/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  };
