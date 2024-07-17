'use client'
import './page.css'

import img1 from '../../public/assets/img1.jpg'
import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from "gsap";


export default function Home() {
  useEffect(() => {
    const gallery = document.querySelector(".gallery");
    const previewImage = document.querySelector(".center_img img");
    //console.log(previewImage)

    for (let i = 0; i < 150; i++) {
      const item = document.createElement("div");
      item.className = "item";
      const img = document.createElement("img");
      const caminho = "./assets/img" + ((i % 15) + 1) + ".jpg";
      img.src = caminho
      
      item.appendChild(img);
      gallery.appendChild(item);

    }
    const items = document.querySelectorAll(".item");
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

  })
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

          </div>
        </div>

      </section>
    </>
  );
}
