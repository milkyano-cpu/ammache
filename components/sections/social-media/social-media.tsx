import React from 'react';
import { Instagram } from "lucide-react";
import Image from "next/image";
import { socialMediaImages } from "@/lib/constants/social-media";

function SocialMedia() {
  return (
    <>
      <div className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:justify-center lg:items-center space-y-4">
            <div className="flex items-center gap-3">
              <p className="typo-overline text-gray-800">OUR SOCIAL MEDIA</p>
              <div className="w-10 h-px bg-gray-400"></div>
            </div>
            <h2 className="typo-h2 text-black">Follow Our Socials</h2>
          </div>

          <div className="flex lg:justify-between lg:flex-row flex-col-reverse lg:mt-8">
            <div className="space-y-2">
              <p className="font-bold">ammachearchitects</p>
              <div className="flex items-center gap-4">
                <p><span className="font-bold">84</span> Posts</p>
                <p><span className="font-bold">7,667</span> Followers</p>
                <p><span className="font-bold">267</span> Following</p>
              </div>
            </div>
            <div className="my-8 lg:my-0">
              <a
                href="https://www.instagram.com/ammachearchitects/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 w-fit h-12 justify-center items-center px-6 cursor-pointer border border-black rounded-full bg-white hover:bg-black font-bold hover:text-white transition">
                <Instagram size={24} />
                <span>Follow</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4 mt-4">
            {socialMediaImages.map((item, i) => (
            <a
              key={i}
              href="https://www.instagram.com/ammachearchitects/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-4/5 overflow-hidden rounded-md group">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="
                  object-cover
                  transition-transform duration-500 ease-in-out
                  group-hover:scale-110
                "
              />
            </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href="https://www.instagram.com/ammachearchitects/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border-2 border-gray-300 typo-button hover:bg-black hover:text-white transition cursor-pointer inline-block">
              See More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialMedia;
