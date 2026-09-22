"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isClient) return;
    
    if (touchStart - touchEnd > 75) {
      // Swipe left
      if (currentTestimonial < testimonials.length - 1) {
        setCurrentTestimonial(currentTestimonial + 1);
      }
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      if (currentTestimonial > 0) {
        setCurrentTestimonial(currentTestimonial - 1);
      }
    }
  };

  const testimonials = [
    {
      name: "Jackson Lucas",
      title: "CFO, Rins Mine",
      content:
        "Consequat reprehenderit laborum nisi cillum. Sit minim voluptate consequat fugiat enim ex aliqua minim est incididunt velit exercitation. Pariatur cupidatat aute ullamco velit quis cillum minim excepteur cupidatat id minim in nostrud ipsum voluptate. Nulla excepteur id reprehenderit tempor incididunt adipisicing adipisicing consectetur. Officia dolor eiusmod id ipsum minim laborum in ut minim cillum do pariatur laborum officia. Aute cupidatat ullamco reprehenderit. Sunt officia nisi Lorem. Commodo id in incididunt culpa.",
      avatar: "/jackson-headshot.webp",
    },
    {
      name: "Edward Austin",
      title: "CFO, Rins Mine",
      content:
        "Eiusmod enim ea pariatur. Eu esse in eu nulla ea cillum Lorem cillum eiusmod velit in sunt incididunt sint. Enim non ipsum cillum et et labore nisi sunt ullamco. Et sit excepteur laborum irure culpa excepteur. Irure excepteur excepteur laborum.",
      avatar: "/edward-austin-headshot.webp",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#1e4a2b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
          Testimonials
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out touch-pan-y"
              style={{ transform: `translateX(-${isClient ? currentTestimonial * 100 : 0}%)` }}
              onTouchStart={isClient ? handleTouchStart : undefined}
              onTouchMove={isClient ? handleTouchMove : undefined}
              onTouchEnd={isClient ? handleTouchEnd : undefined}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white text-black p-6 md:p-8 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-6">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={`Portrait of ${testimonial.name}`}
                        width={64}
                        height={64}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <div className="font-bold text-lg md:text-xl text-[#1e4a2b]">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-sm md:text-base">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 md:mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={isClient ? () => setCurrentTestimonial(index) : undefined}
                className={`w-4 h-4 rounded-full transition-colors border ${
                  index === (isClient ? currentTestimonial : 0)
                    ? "bg-white border-white"
                    : "border-white bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
