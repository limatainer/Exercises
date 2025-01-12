/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';

import { FaArrowRightLong } from 'react-icons/fa6';
import {
  MdOutlineAppRegistration,
  MdOutlineAddCircleOutline,
} from 'react-icons/md';
import { SiProbot, SiFastly } from 'react-icons/si';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/* News */}
          <NavLink
            to="/about"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 
            mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800
             dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span
              className="text-xs bg-secondary-300 rounded-full
             text-white px-4 py-1.5 mr-3"
            >
              New
            </span>{' '}
            <span className="text-sm font-medium">
              CadastRAR is out! See whats new
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </NavLink>
          {/* Hero */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Streamlining Data Management and Document Generation with AI
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Our platform offers advanced solutions for registering individuals
            and managing databases, utilizing artificial intelligence to
            generate personalized and automated documents with the provided
            data.
          </p>

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn more
              <FaArrowRightLong className="ml-2" />
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdOutlineAddCircleOutline className="mr-2" />
              Watch video
            </a>
          </div>
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              SIMPLY FAST
            </span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              <MdOutlineAppRegistration className="icons" />
              <SiProbot className="icons" />

              <SiFastly className="icons" />
            </div>
          </div>
        </div>
      </header>
      {/* Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Let's Create Tools and Ideas to Streamline Data Management and
              Document Generation
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Our technology ensures efficiency and accuracy, allowing you to
              focus on the growth and success of your business by providing
              advanced solutions for registering individuals and managing
              databases with AI-powered document generation.
            </p>

            <NavLink to="/register" className="btn">
              Get started
              <FaArrowRightLong className="ml-2" />
            </NavLink>
          </div>
          <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <img
            className="w-full hidden dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
        </div>
      </section>
    </div>
  );
}
