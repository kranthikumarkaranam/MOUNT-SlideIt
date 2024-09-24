/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'; // Importing the CSSPlugin is necessary for CSS-related animations
import { Power3 } from 'gsap';

import LeftArrow from '../assets/left-arrow.svg';
import RightArrow from '../assets/right-arrow.svg';

const galleryStyles = css`
	flex-grow: 1;
	position: relative;

	display: grid;
	grid-template-columns: 2fr 3fr;
	height: 100%;
	width: 100%;

	.content {
		height: 100%;
		width: 100%;
		position: relative;

		ul {
			list-style: none;
			overflow: hidden;
			width: calc((100vw - 60px) * 2 / 5);
			height: 100%;
			position: relative;

			li {
				width: calc((100vw - 60px) * 2 / 5);
				height: 100%;
				padding: 28px;
				opacity: 0;
				position: absolute;

				h1 {
					font-size: 1.5rem;
					margin-bottom: 1rem;
				}

				p {
					font-size: 0.875rem;
					letter-spacing: 0.88px;
					line-height: 1.25rem;
					margin-bottom: 1rem;
				}

				span {
					font-size: 0.75rem;
					color: rgb(120, 122, 124);
				}
			}
		}

		.controls {
			position: absolute;
			left: 24px;
			bottom: 24px;
			display: flex;

			button {
				width: 28px;
				height: 28px;
				margin: 0 4px;
				border-radius: 100px;
				transition: 0.3s ease-in-out;
				cursor: pointer;

				display: flex;
				justify-content: center;
				align-items: center;

				border: none;
				outline: none;
				background: none;

				&:hover {
					background: rgb(244, 244, 244);
				}

				&:disabled {
					cursor: auto;
					opacity: 0.5;

					&:hover {
						background: none;
					}
				}

				img {
					width: 28px;
					height: 28px;
					padding: 6px;
				}
			}
		}
	}

	.image {
		height: 100%;
		width: 100%;

		ul {
			display: flex;
			list-style: none;
			overflow: hidden;
			height: 100%;
			width: calc((100vw - 60px) * 3 / 5);

			li {
				width: calc((100vw - 60px) * 3 / 5);
				height: 100%;
			}
		}

		img {
			width: calc((100vw - 60px) * 3 / 5);
			height: 100%;
			object-fit: cover;
			background: rgb(244, 244, 244);
		}
	}

	.cover {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 3fr;
		z-index: 100;

		.left,
		.right {
			background: #fff;
		}
	}
`;

const Gallery = ({ data }) => {
	let imageList = useRef(null);
	let detailList = useRef(null);

	const [active, setActive] = useState(0);

	gsap.registerPlugin(CSSPlugin);

	useEffect(() => {
		gsap.to(detailList.children[0], {
			opacity: 1,
		});

		gsap.to('.cover .left', {
			y: '-100%',
			ease: Power3.easeOut,
			delay: 0.7,
		});

		gsap.to('.cover .right', {
			x: '100%',
			ease: Power3.easeOut,
			delay: 1,
		});

		gsap.from('.image', {
			scale: 0.9,
			ease: Power3.easeOut,
			delay: 1,
		});

		gsap.to('.cover', {
			display: 'none',
			delay: 2.2,
		});
	}, []);

	const nextSlide = () => {
		let shift = imageList.getBoundingClientRect().width;
		gsap.to(imageList.children, {
			x: -(shift * (active + 1)),
			ease: Power3.easeOut,
			duration: 1,
		});

		gsap.to(detailList.children[active], {
			opacity: 0,
			ease: Power3.easeOut,
		});

		gsap.to(detailList.children[active + 1], {
			opacity: 1,
			ease: Power3.easeOut,
			delay: 1,
		});

		gsap.from(detailList.children[active + 1], {
			y: 20,
			ease: Power3.easeOut,
			delay: 1,
		});

		setActive(active + 1);
	};

	const prevSlide = () => {
		let shift = imageList.getBoundingClientRect().width;
		gsap.to(imageList.children, {
			x: -(shift * (active - 1)),
			ease: Power3.easeOut,
			duration: 1,
		});

		gsap.to(detailList.children[active], {
			opacity: 0,
			ease: Power3.easeOut,
		});

		gsap.to(detailList.children[active - 1], {
			opacity: 1,
			ease: Power3.easeOut,
			delay: 1,
		});

		gsap.from(detailList.children[active - 1], {
			y: 20,
			ease: Power3.easeOut,
			delay: 1,
		});

		setActive(active - 1);
	};

	return (
		<div css={galleryStyles}>
			<div className='content'>
				<ul ref={(el) => (detailList = el)}>
					{data.map((item, idx) => (
						<li className={active === idx ? 'active' : ''}>
							<h1>{item.title}</h1>
							<p>{item.description}</p>
							<span>{item.location}</span>
							<br></br>
							<span>{item.height}</span>
						</li>
					))}
				</ul>
				<div className='controls'>
					<button
						onClick={prevSlide}
						disabled={active === 0}
					>
						<img
							src={LeftArrow}
							alt='Left'
						/>
					</button>
					<button
						onClick={nextSlide}
						disabled={active === data.length - 1}
					>
						<img
							src={RightArrow}
							alt='Right'
						/>
					</button>
				</div>
			</div>
			<div className='image'>
				<ul ref={(el) => (imageList = el)}>
					{data.map((item, idx) => (
						<li className={active === idx ? 'active' : ''}>
							<img
								src={item.original_image}
								alt={item.title}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='cover'>
				<div className='left'></div>
				<div className='right'></div>
			</div>
		</div>
	);
};

export default Gallery;
