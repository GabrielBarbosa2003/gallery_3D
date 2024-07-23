'use client'
import './page.css'

import img1 from '../../public/assets/img1.jpg'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import {React} from 'react'


export default function Home() {
  const [itens, setItems] = useState();
  const img_item = useRef([])
  useEffect(() => {
    const generatedItems = [];
    
    
    //console.log(previewImage)

    for (let i = 0; i < 150; i++) {
      const caminho = "./assets/img" + ((i % 15) + 1) + ".jpg";
      //console.log(caminho)
     

      generatedItems.push(
        <div className='item' key={i} ref={img_item}>
          <img src={caminho} alt='' />

        </div>
      )
      
    }
    setItems(generatedItems);


   

  },[])

  useEffect(() => {
    const previewImage = document.querySelector(".center_img img");
    const items = document.querySelectorAll(".item");
    console.log(items)
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    items.forEach((item, index) => {
      gsap.set(item, {
        rotateY: 90,
        rotateZ: index * angleIncrement - 90,
        transformOrigin: "50% 400px",
      })

      item.addEventListener("mouseover" , function () {
        const imgInsideItem = item.querySelector("img");
        previewImage.src = imgInsideItem.src;

        gsap.to(item, {
          x:5,
          y:10,
          z:20,
          ease:"power2.out",
          duration:0.5
        });
        item.addEventListener("mouseout", function () {
          gsap.to(item, {
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.out",
            durtion: 0.5,
          });
        });

      })

    })

  },[itens])
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
          <img src={img1} alt=""/>
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
