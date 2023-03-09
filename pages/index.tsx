import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react'
import Header from '../components/Header';
import { useFavoriteUrls, useFavoriteUrlsDispatch } from './_app';
import { FavoImage } from '../type/Type';

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponse;
  return result[0]
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isPushFav, setIsPushFav] = useState(false);
  const urls = useFavoriteUrls();
  const setUrls = useFavoriteUrlsDispatch();

  const handleClick = () => {
    fetchCatImage()
      .then((image) => {
        setCatImageUrl(image.url)
        if (isPushFav) {
          setIsPushFav(!isPushFav)
        }
      })
      .catch(() => {
        console.log('失敗しました')
      })
  }

  const addFavorite = () => {
    const newfav: FavoImage = {
      id: new Date().getTime(),
      path: catImageUrl
    }
    const newFavs = { ...urls }
    newFavs.favoImages.push(newfav)
    setUrls(newFavs)

    setIsPushFav(!isPushFav)
  }

  return (
    <div style={{margin: "0 auto", width: "600px", height: "100%"}}>
      <Header />
      <button onClick={handleClick}>次のねこさん🐱</button>
      {isPushFav ? <span style={{marginLeft: 15}}>推しに登録！</span> : <button style={{marginLeft: 10}} onClick={addFavorite}>気に入ったにゃ🐈</button>}
      <div style={{ marginTop: 8 }}>
        <img src={catImageUrl} width={500} height="auto" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url
    }
  }
}

export default IndexPage;
