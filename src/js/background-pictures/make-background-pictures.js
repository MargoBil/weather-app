// import { Math } from "core-js";

export default async function (keyWord = 'Киев', userKey = '13157109-fcd6eded5baca4880d7f5c7a8') {
  try {
    // const numberOfPage = Math.round(Math.random()*(25-0)+0);
    const response = await fetch (
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&category=buildings&q=${keyWord}&page=1&per_page=30&key=${userKey}`
    );
    const images = response.json ();
    return images;
  } catch (error) {
    throw error;
  }
}