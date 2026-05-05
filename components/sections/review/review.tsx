"use client"

import React, {Fragment, useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {Star} from "lucide-react";
import {useBreakpoint} from "@/hooks/use-mobile";
import Link from "next/link";

interface ReviewProps {
  name: string;
  review: string;
  rating: number;
}

const reviews: ReviewProps[] = [
  {name: 'Jerome Zouki', review: 'Had a very pleasant experience in dealing with Ammache Architects. The business runs based on professionalism and great customer service. Definitely would continue to work with this great firm and would recommend to anyone that requires work done by highly-experienced professionals.', rating: 5},
  {name: 'Albert Jacobs', review: 'I have found the team at Ammache to be very courteous, professional, cooperative and super helpful.\n'+
      '\n'+
      'I value their solutions driven approach, coupled with innovation and broad industry knowledge.\n'+
      '\n'+
      'I am pleased to wholeheartedly recommend Ammache Architects.', rating: 5},
  {name: 'Joseph Alesci', review: 'Nidal Ammache provided us with a unique vision for our complicated site,  to come up with a practical and elegant solution. The land development yield improved significantly. This is an architect who can design but understands commercial realities and construction methods. Nidal also knows how to navigate complex council requirements.', rating: 5},
  {name: 'Gus T', review: 'Incredibly talented Architect\n'+
      'I\'ve known Ammache Architects (Nidal) since 2000 & he has evolved as a creative force & a great human being. Highly recommended in all facets of design & permits and much much more - he\'s international. Gus T', rating: 5},
  {name: 'Naim Melhem', review: 'For more than twenty five years of my experience with Ammache  Architects I have seen how this company gone from strength to strength made me more proud of my association with Ammache Architects  as I completed four projects with them during this period, Berwick , Rowville , Narre Warren, and my best of the best was Phillip Island Cowes  I encourage everyone to search 403 Settlement Road Cowes and see the detail they provided me with the best service you could get by, they followed my  projects from start to finish  just to make sure all goes to plan. I always recommend Ammache Architects to my friends as I like them to get the same experience I had in the last state of the art work they did in the high-rise  South Melbourne Thistlethwaite Street Confidently  l give it 10 out of 10 for sure .\n'+
      '\n'+
      'Naim Melhem OAM', rating: 5},
  {name: 'Dion Zouky', review: 'Nidal Ammache provided us with a unique vision for our complicated site,  to come up with a practical and elegant solution. The land development yield improved significantly. This is an architect who can design but understands commercial realities and construction methods. Nidal also knows how to navigate complex council requirements.', rating: 5},
  {name: 'akash ahluwalia', review: 'Nidal Ammache provided us with a unique vision for our complicated site,  to come up with a practical and elegant solution. The land development yield improved significantly. This is an architect who can design but understands commercial realities and construction methods. Nidal also knows how to navigate complex council requirements.', rating: 5},
  {name: 'Ali Oumacha', review: 'Really great experience with Ammache. They helped us out with our first home in Bentleigh East, They were super easy to deal with, listened to what we wanted, and came up with a design we’re super happy with. Everything ran smoothly and communication was solid the whole way through. Would definitely recommend.', rating: 5},
  {name: 'R J', review: 'Highly recommended, very professional, very responsive and creative, a pleasure to do business with.', rating: 5},
  {name: 'Effie Tangalakis', review: 'Wonderful people to deal with, very friendly and courteous with a great understanding of construction methods and commercial actualities.', rating: 5},
];

function ReviewCard({name, review, rating}: ReviewProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-4 border px-6 py-8 rounded-2xl">
      <div className="flex gap-1">
        {Array.from(new Array(rating)).map((_, i) => (
          <Fragment key={i}>
            <Star fill="#FFC107" size={20} strokeWidth={0}/>
          </Fragment>
        ))}
      </div>
      <p className="font-bold">{name}</p>
      <p className={expanded ? "" : "line-clamp-4"}>{review}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="self-start uppercase text-black/40 hover:text-black transition">
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  )
}

const visibleCountMap = { mobile: 1, tablet: 1, desktop: 3 }

function Review() {
  const breakpoint = useBreakpoint()

  return (
    <>
      <div className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          <div className="flex flex-col gap-2">
            <span className="typo-h2">Hear from<br className="hidden md:block" />our clients</span>
            <span className="typo-body-sm text-gray-600">Spaces designed for people, shared through real client stories.</span>
            <Link
              href="/contact"
              className="md:flex hidden mt-4 px-8 py-3.5 border border-black rounded-full typo-button bg-black text-white transition cursor-pointer justify-center items-center md:w-50">
              Contact Us
            </Link>
          </div>
          <div className="lg:col-span-3">
            <Slider
              items={reviews}
              visibleCount={visibleCountMap[breakpoint]}
              renderItem={(review, i) => <ReviewCard key={i} {...review} />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
