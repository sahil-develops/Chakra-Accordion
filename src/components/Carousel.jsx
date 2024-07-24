import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Carousel({title,data}) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    prevArrow:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="m15 18-6-6 6-6"/></svg>,
    nextArrow:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="m9 6 6 6-6 6"/></svg>
  };
  return (
    <div className="slider-container">
     <p style={{fontSize:"16px"}}>{title}</p>
      <Slider {...settings} className="accordionSliderCard" >
      {/* <div style={{display:"flex",flexDirection:'column',gap:"10px"}}> */}
     {data.map((item,index) => (
      
        <a href={item.homepage} target="_blank" className="accordionInnerCarouselCard">
        <div key={index} className="accordionInnerCard">

<img src={item.coverPhoto} style={{borderRadius:"8px"}} width={"200px"} height={"100px"} />

          <p className="fullName">{item.fullName ? item.fullName : "N/A"}</p>
          <p className="statusMessage">{item.statusMessage ? item.statusMessage : "Lorem Ipsum is simply dummy text "}</p>
          <p className="lastdate">{item.joinedDate ? item.joinedDate : "N/A"}</p>
        </div>
        </a>
     ))}
      {/* </div> */}
     
      </Slider>
    </div>
  );
}

export default Carousel;