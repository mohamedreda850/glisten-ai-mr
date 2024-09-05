"use client"
import ButtonLink from '@/components/ButtonLink'
import StarGrid from '@/components/StarGrid'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import React, { useRef } from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react"
import usePrefersReducedMotion from './../../hooks/usePrefersRedusedMotion';

export default function AnimatedContent({slice} :{slice:Content.HeroSlice}) {
    const container = useRef(null)
    const prefersRedusedMotion = usePrefersReducedMotion()
    gsap.registerPlugin(useGSAP)
    useGSAP(()=>{
      if(prefersRedusedMotion){
        gsap.set(".hero__heading ,.hero__body ,.hero__button,.hero__image,.hero__glow",{opacity:1})
      return;
      }
        const tl = gsap.timeline({defaults:{ease:'power2.inOut'}})
        tl.fromTo(".hero__heading" , {scale:0.5} ,{scale:1 , opacity:1 ,duration:1.4})
        tl.fromTo(".hero__body" , {y:20} ,{y:0 , opacity:1 ,duration:1.2},"-=0.6" )
        tl.fromTo(".hero__button" , {scale:1.5} ,{scale:1 , opacity:1 ,duration:1.3},"-=0.8")
        tl.fromTo(".hero__image" , {y:100} ,{y:0 , opacity:1 ,duration:1.3},"+=0.3")
        tl.fromTo(".hero__glow" , {scale:0.5} ,{scale:1 , opacity:1 ,duration:1.8},"-=1")

    } , {scope:container})
  return (
    <div className="relative flex-col justify-center" ref={container}>
        <StarGrid />
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="hero__heading text-balance text-5xl font-medium md:text-7xl opacity-0">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <div className="hero__body opacity-0 mx-auto mt-6 max-w-md text-balance text-slate-300">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}
        {isFilled.link(slice.primary.buttonlink) && (
          <ButtonLink className="hero__button opacity-0 mt-8" field={slice.primary.buttonlink}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
        {isFilled.image(slice.primary.image) && (
          <div className="hero__image opacity-0 glass-container mt-16 w-fit">
            <div className="hero__glow opacity-0 absolute inset-0 -z-10 bg-blue-500/30 blur-2xl filter"/>
          <PrismicNextImage
            className="rounded-lg"
            field={slice.primary.image}
          />
          
          </div>
        )}
      </div>
  )
}
