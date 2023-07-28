/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'; // Importing the CSSPlugin is necessary for CSS-related animations
import { Power3 } from 'gsap'

import Menu from '../assets/menu.svg'
import Twitter from '../assets/twitter.svg'
import Instagram from '../assets/instagram.svg'

const navbarStyles = css`
width: 60px;
display: grid;
grid-template-rows: repeat(3, 1fr);
padding: 20px 12px;
justify-items: center;

.menu {
  align-self: start;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

h1 {
  align-self: center;

  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;

  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.socials {
  align-self: end;

  display: flex;
  flex-direction: column;

  img {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    cursor: pointer;
  }
}
`

const Navbar = () => {
  let nav = useRef(null)

  gsap.registerPlugin(CSSPlugin);

  useEffect(() => {
    gsap.from(nav, {
      x: -80,
      ease: Power3.easeOut,
      duration: 1
    });
  }, []);
  

  return (
    <nav css={navbarStyles} ref={el => nav = el}>
      <img src={Menu} alt="Menu" className="menu" />
      <h1>Gallery</h1>
      <div className="socials">
        <a href="https://twitter.com/_kranthi_sm__/" target="_blank" rel="noopener noreferrer">
        <img src={Twitter} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/___kranthi_sm__/" target="_blank" rel="noopener noreferrer">
        <img src={Instagram} alt="Instagram" />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
