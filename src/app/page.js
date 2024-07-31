'use client'
import './page.css'

import img1 from '../../public/assets/img1.jpg'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import  gsap  from "gsap";
import { React } from 'react'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 


export default function Home() {
  const [itens, setItems] = useState();
  const img_item = useRef([])
  const [imageCenter, setImageCenter] = useState(img1)

  useEffect(() => {
    const generatedItems = [];

    for (let i = 0; i < 150; i++) {
      const caminho = "./assets/img" + ((i % 15) + 1) + ".jpg";


      generatedItems.push(
        <div className='item' key={i} ref={(el) => (img_item.current[i] = el)}>
          <img src={caminho} alt='' />
        </div>
      )

    }
    setItems(generatedItems);




  }, [])

  useGSAP(() => {
    const numberOfItems = img_item.current.length;
    const angleIncrement = 360 / numberOfItems;

    img_item.current.forEach((item, index) => {
      gsap.set(item, {
        rotateY: 90,
        rotateZ: index * angleIncrement - 90,
        transformOrigin: "50% 400px",
      })

      const handleMouseOver = () => {
        const imgInsideItem = item.querySelector("img");
        setImageCenter(imgInsideItem.src);

        gsap.to(item, {
          x: 5,
          y: 10,
          z: 20,
          ease: "power2.out",
          duration: 0.5
        });

      }

      const handleMouseOut = () => {
        gsap.to(item, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.out",
          duration: 0.5,
        });

      }

      item.addEventListener("mouseover", handleMouseOver);
      item.addEventListener("mouseout", handleMouseOut);

      return () => {
        item.removeEventListener("mouseover", handleMouseOver);
        item.removeEventListener("mouseout", handleMouseOut);
      };


    })

    img_item.current.forEach((item) => {
      gsap.to(item, {
        rotationX:200,
        scrollTrigger:{
          trigger:"body",
          start: "top top",
          end: "bottom bottom",
          scrub:2,
          markers: true,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        }
      });
  

    })


 

  }, [itens])


  return (
    <>
      <nav className='top'>
        <div className='left_top'>
          <p>Code web / Gabriel Barbosa</p>
        </div>

        <div className='right_top'>
          <a href='' target="_blank"> <p>Instagram</p></a>
          <a href='' target="_blank"> <p>Linkedin</p></a>
          <a href='' target="_blank"> <p>GitHub</p></a>
        </div>

      </nav>

      <section>
        <div className='center_img'>
          <img src={imageCenter} alt="" />
        </div>
        <div className='container'>
          <div className='gallery'>
            {itens}

          </div>
        </div>

      </section>
    </>
  );
}
