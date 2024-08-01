import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className=" max-w-7xl lg:px-11 sm:px-4 mx-auto pb-20">
      <h2
        data-aos="fade-up"
        data-aos-duration="800"
        className="sm:pb-11 pb-2 sm:pt-20 pt-16 text-center md:text-6xl sm:text-4xl text-3xl uppercase tracking-wider"
      >
        About us
      </h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 items-center">
        <div className="px-4 sm:px-2 sm:pe-16">
          <p
            className=" text-base font-light pb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Empowering Your Success Across Education, Career, Healthcare, IT,
            and Visa Consulting. At Noyagastya Consultancy, we offer specialized
            consulting services tailored to meet your unique needs. Whether
            {`you're`} a student exploring educational opportunities, a
            professional seeking career guidance, a healthcare provider needing
            specialized advice, a business looking to leverage technology for
            growth, or an individual navigating visa complexity, our dedicated
            team of experts is here to support you.
          </p>
          <p
            className=" text-base font-light max-sm:pb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            From personalized education planning and career counseling to
            specialized medical advice, innovative IT solutions, and streamlined
            visa services, we provide comprehensive support to help you achieve
            your goals. With a commitment to excellence and a client-centric
            approach, we ensure you receive reliable guidance and support
            throughout your journey.
          </p>
        </div>
        <div>
          <Image
            data-aos="flip-right"
            // data-aos-anchor-placement="bottom-center"
            data-aos-duration="800"
            alt="banner"
            width="490"
            className="w-full lg:h-96 object-cover"
            height="635"
            src="https://static.wixstatic.com/media/82fcd3_0fdc534469f5472699491ca8fc95574a~mv2.jpg/v1/fill/w_489,h_634,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_0fdc534469f5472699491ca8fc95574a~mv2.jpg"
          />
        </div>
      </div>
    </div>
  );
}
