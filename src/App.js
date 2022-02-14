import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import { wait } from '@testing-library/user-event/dist/utils';

export default () => {

  //Aqui usando uma variavel de estado
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  //Aqui usando um efeito para ler a API quando carrega a pagina
  useEffect(()=> {
    const loadAll = async() => {
      setMovieList([]);
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10) { 
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://www.rchandru.com/images/portfolio/modals/m-loading.gif" alt="Carregando" />
        </div>
      }

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      } 
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      {movieList.length > 0 &&
        <footer>
          Feito com <span role='img' aria-label='fire'>🔥</span> por George L. Maluf<br />
          Direitos de imagem para Netflix<br />
          Dados originais do themoviedb.org
        </footer>
      }
    </div>
  );
}