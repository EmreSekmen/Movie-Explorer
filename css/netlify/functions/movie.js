export default async (req) => {

    const url = new URL(req.url);

    const imdbId = url.searchParams.get("id");

    const apiKey = process.env.OMDB_API_KEY;

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}&plot=full`
    );

    const data = await response.json();

    return Response.json(data);
};