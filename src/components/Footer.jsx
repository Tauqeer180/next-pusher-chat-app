import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-primary">
      <div className=" grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1  max-w-7xl lg:px-11 sm:px-4 px-2 mx-auto pb-20">
        <div>
          <h2 className=" pt-12 pb-4 uppercase text-white text-xl tracking-wider">
            {" "}
            james consulting{" "}
          </h2>

          <p className="text-base text-white tracking-wider font-light ">
            500 Terry Francine Street,
          </p>
          <p className="text-base text-white tracking-wider font-light ">
            San Francisco, CA 94158
          </p>
          <p className="text-base text-white tracking-wider font-light ">
            Mail: info@mysite.com
          </p>
          <p className="text-base text-white tracking-wider font-light ">
            Tel: 123-456-7890
          </p>
        </div>
        <div className="md:block hidden"></div>
        <div>
          <h2 className=" pt-12 pb-4 uppercase text-white text-xl tracking-wider">
            {" "}
            Menu{" "}
          </h2>
          <ul>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                Plans & pricing
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                tools & tips
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-white tracking-wider font-light  capitalize "
              >
                contacts
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className=" pt-12 pb-4 uppercase text-white text-xl tracking-wider">
            {" "}
            socials{" "}
          </h2>

          <div className="flex gap-2">
            <Link href="/">
              <Image
                alt="social"
                height="20"
                width="20"
                src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_25,h_25,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/23fd2a2be53141ed810f4d3dcdcd01fa.png"
              />
            </Link>
            <Link href="/">
              <Image
                alt="social"
                height="20"
                width="20"
                src="https://static.wixstatic.com/media/01ab6619093f45388d66736ec22e5885.png/v1/fill/w_25,h_25,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/01ab6619093f45388d66736ec22e5885.png"
              />
            </Link>
          </div>

          <p className="text-sm pt-14 text-white tracking-wider font-light ">
            © 2024 by TAUQEER ABBAS. Powered and secured by DigitalCode
            Technologies
          </p>
        </div>
      </div>
    </div>
  );
}
