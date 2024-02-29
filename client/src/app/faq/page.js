'use client'
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { motion } from 'framer-motion'
const Accordion = ({ data }) => {
  const [openSections, setOpenSections] = useState([0]);

  const toggleAccordion = (index) => {
    setOpenSections((prevOpenSections) => {
      if (prevOpenSections.includes(index)) {
        return prevOpenSections.filter((i) => i !== index);
      } else {
        return [...prevOpenSections, index];
      }
    });
  };
  return (

    <section className=" bg-[#DBFCE1] mt-14">
      <div className="container mx-auto px-4 py-16">
        <motion.h1

          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            stiffness: 100,
            damping: 15,
            duration: 0.5,
            ease: "easeIn",


          }} className="text-[#803DFF] lg:text-[64px] text-[20px] lg:leading-[80px] text-center pb-16">Frequently Asked Questions</motion.h1>
        <div className="md:grid md:grid-cols-1 lg:gap-4 lg:space-y-0 space-y-6">
          

            {data.map((item, index) => (
              <div key={index} className="  px-4 lg:px-10  mx-auto border rounded-xl py-4 bg-white">
                <h6 className="">
                  <button
                    className="relative flex  items-center w-full p-4 font-semibold text-left transition-all ease-in cursor-pointer border-slate-400 text-slate-700 rounded-t-1 group text-dark-500"
                    onClick={() => toggleAccordion(index)}
                  >
                    <motion.h1
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5,
                        ease: "easeIn",

                      }} className="  lg:text-[36px] text-[15px] lg:leading-[42px] text-[#1F524D] ">{item.question}</motion.h1>
                    {openSections.includes(index) ? (
                      <IoMdArrowDropup className="absolute right-0  font-sansextrabold text-3xl text-primary" />
                    ) : (
                      <IoMdArrowDropdown className="absolute right-0  font-sansextrabold  text-3xl text-primary" />
                    )}
                  </button>
                </h6>
                <div
                  data-collapse={`collapse-${index}`}
                  className={`${openSections.includes(index) ? "h-auto" : "h-0 overflow-hidden"
                    } transition duration-1000 ease-in-out transform`}
                >
                  <div className="p-4 text-medium font-[poppinsreg] leading-normal font-sansregular text-blue-gray-500/80">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="">
            <img className="" src="images/Character.png" alt="" />
          </div>
        </div>

     
     
    </section>
  );
};


const accordionData = [
  {
    question: "What credit cards can I use with Billr?",
    answer:
      "Viasat Internet is residential satellite internet service. We're dedicated to bringing reliable, high-speed connectivity to the hardest to reach people, places, and things — including families in rural or remote areas where cable companies don't go.",
  },
  {
    question: "How does Billr help my business?",
    answer:
      "Viasat Internet is available in continental U.S and covers much of the U.S. population in remote and rural areas where other internet companies offer slow service, or no service at all.",
  },
  {
    question: "What fees does Billr charge?",
    answer:
      "You click on your favorite website using your laptop or mobile device. Your request goes to your Viasat modem, then through a short cable to the dish outside your home. The dish installed at your home beams your request up to our satellite. Our satellite sends your website request down to a gateway station connected to our ground network. The station relays your request to your favorite website. The website delivers the information you requested back to the station, which sends it up to our satellite to be sent directly to you.",
  },
  {
    question: "Is Billr secure?",
    answer:
      "Viasat Internet is likely best for people who have trouble getting fast internet because they live in remote or rural areas where cable or fiber companies don't go. It's great for essential, everyday online activities like shopping, banking, education, and staying in touch with family.",
  },
  {
    question: "Can I pay international suppliers with Billr?",
    answer:
      "Viasat Internet is likely best for people who have trouble getting fast internet because they live in remote or rural areas where cable or fiber companies don't go. It's great for essential, everyday online activities like shopping, banking, education, and staying in touch with family.",
  },
];

const App = () => {
  return <Accordion data={accordionData} />;
};

export default App;
