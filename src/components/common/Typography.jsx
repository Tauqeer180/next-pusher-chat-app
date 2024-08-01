"use client"
import React from "react";

export function H1({ children, className }) {
  return (
    <h1
      data-aos="fade-up"
      data-aos-duration="800"
      className={`sm:pb-11 pb-2  text-center md:text-6xl sm:text-4xl text-3xl uppercase tracking-wider ${className} `}
    >
      {children}
    </h1>
  );
}
export function H2({ children, className }) {
  return (
    <h2
      data-aos="fade-up"
      data-aos-duration="800"
      className={` pb-2 sm:pt-14 pt-10 text-center md:text-5xl sm:text-3xl text-2xl uppercase tracking-wider ${className} `}
    >
      {children}
    </h2>
  );
}
export function H3({ children, className }) {
  return (
    <h3
      data-aos="fade-up"
      data-aos-duration="800"
      className={` pb-2 sm:pt-14 pt-10 text-center md:text-4xl sm:text-3xl text-2xl uppercase tracking-wider ${className} `}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }) {
  return (
    <h4
      data-aos="fade-up"
      data-aos-duration="800"
      className={` pb-2 sm:pt-12 pt-8  md:text-3xl sm:text-2xl text-xl  uppercase tracking-wider ${className} `}
    >
      {children}
    </h4>
  );
}
export function H5({ children, className }) {
  return (
    <h5
      data-aos="fade-up"
      data-aos-duration="800"
      className={` sm:pt--8 pt--4  font-normal md:text-2xl sm:text-xl text-lg sm:pb-4 pb-2 ${className} `}
    >
      {children}
    </h5>
  );
}
export function H6({ children, className }) {
  return (
    <h6
      data-aos="fade-up"
      data-aos-duration="800"
      className={` font-normal md:text-xl sm:text-lg text-base sm:pb-4 pb-2 ${className}`}
    >
      {children}
    </h6>
  );
}

export function P({ children, className }) {
  return (
    <p
      data-aos="fade-up"
      data-aos-duration="800"
      className={`sm:pb-4 pb-2 font-light ${className}`}
    >
      {children}
    </p>
  );
}
