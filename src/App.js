/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'; // Importing the CSSPlugin is necessary for CSS-related animations

import './App.css';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';

import data from './assets/data';

const appStyles = css`
display: flex;
height: 100vh;
align-items: stretch;

visibility: hidden;
`

function App() {
  let app = useRef(null)
  gsap.registerPlugin(CSSPlugin);

  useEffect(() => {
    gsap.to(app, {
      duration: 0,
      css: {
        visibility: 'visible'
      }
    });
  }, []);

  return (
    <div className="App" css={appStyles} ref={el => app = el}>
      <Navbar />
      <Gallery data={data} />
    </div>
  );
}

export default App;
