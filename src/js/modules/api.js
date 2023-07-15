export const loadArticles = async (url = 'https://gorest.co.in/public-api/posts') => {
    const result = await fetch(url);
    const data = await result.json();
    return data;
}