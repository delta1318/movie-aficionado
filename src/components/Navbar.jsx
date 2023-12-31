import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../Contexts/MovieContext";
import { Fade } from "react-reveal";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const contextData = useContext(MovieContext);
  const { setEndpoint, api_key, setHeading, theme, setPage, setShowHeroImage } =
    contextData;
  //we will again make popular movies show when we click Home Link
  const goToHome = () => {
    //this method will close navbar
    setNavbar(!navbar);
    setPage(1);
    setEndpoint(`movie/popular?api_key=${api_key}`);
    setHeading("Popular movies");
    setShowHeroImage(true);
  };
  const logoClick = () => {
    if (navbar === true) {
      setNavbar(false);
    }
    setPage(1);
    setEndpoint(`movie/popular?api_key=${api_key}`);
    setHeading("Popular movies");
    setShowHeroImage(true);
  };
  //we added click method in Home link and use if we have click_method, we will use ternary to check
  const nav_items = [
    { title: "Home", link: "/", click_method: goToHome },
    { title: "Explore Movies", link: "/explore" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <>
      <Fade left>
        <nav
          className={`w-full ${
            theme === "light"
              ? "bg-white border border-b-2"
              : "bg-stone-800 text-white border-b"
          }  `}
        >
          <div className="text-xl justify-between px-3 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <Link to="/" onClick={logoClick} className="text-2xl font-bold">
                  Movie Aficionado
                </Link>
                <div className="md:hidden">
                  <button
                    className={`p-2 ${
                      theme === "light" ? "text-gray-700" : "text-white"
                    }  rounded-md outline-none focus:border-gray-400 focus:border`}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  {nav_items.map((element) => {
                    const { title, link, click_method } = element;
                    return (
                      <li
                        className="text-gray-600 hover:text-blue-600"
                        key={title}
                      >
                        <Link
                          to={link}
                          onClick={
                            click_method !== undefined
                              ? click_method
                              : () => {
                                  setShowHeroImage(true);
                                  setNavbar(!navbar);
                                }
                          }
                          className={`p-2 rounded-lg ${
                            theme === "light"
                              ? "text-black  hover:bg-slate-600  hover:text-white"
                              : "text-white hover:text-black hover:bg-slate-200"
                          }  `}
                        >
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Fade>
    </>
  );
};

export default Navbar;
