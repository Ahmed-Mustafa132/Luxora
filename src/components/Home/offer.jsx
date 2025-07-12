import FadeInWhenVisible from "../FadeInWhenVisible/FadeInWhenVisible";
import before from "./assets/before.png";
import service1 from "./assets/service1.jpg";
import service2 from "./assets/service2.jpg";
import service3 from "./assets/service3.jpg";

export default function Offer() {
  return (
    <FadeInWhenVisible
      direction="left"
      delay={1}
      className=" pt-44 bg-white dark:bg-darkChocolate w-full"
    >
      <div className="flex justify-center items-center gap-8">
        <img src={before} alt="img" />
        <div className="text-coffee " style={{ letterSpacing: "10px" }}>
          Whet We Offer
        </div>
        <img src={before} alt="img" />
      </div>
      <h2 className="text-4xl text-center m-12">Get Our Special Offer.</h2>
      <div className="flex justify-center items-center gap-9">
        <FadeInWhenVisible direction="up" delay={100}>
          <div className=" overflow-hidden hover:overflow-hidden overflow-x-hidden">
            <div
              className="w-72 h-96  hover:scale-150 flex justify-start items-center"
              style={{ backgroundImage: `url(${service1})` }}
            ></div>
            <div className="bg-white  absolute bottom-24 pt-3 pb-3 pl-3 pr-8 hover:bg-coffee hover:text-white dark:bg-darkChocolate dark:hover:bg-coffee cursor-pointer">
              Family Discount
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={300}>
          <div className=" overflow-hidden hover:overflow-hidden overflow-x-hidden">
            <div
              className="w-72 h-96  hover:scale-150 flex justify-start items-center"
              style={{ backgroundImage: `url(${service2})` }}
            ></div>
            <div className="bg-white  absolute bottom-24 pt-3 pb-3 pl-3 pr-8 hover:bg-coffee hover:text-white dark:bg-darkChocolate dark:hover:bg-coffee cursor-pointer">
              Couples offer
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={500}>
          <div className=" overflow-hidden hover:overflow-hidden overflow-x-hidden">
            <div
              className="w-72 h-96  hover:scale-150 flex justify-start items-center"
              style={{ backgroundImage: `url(${service3})` }}
            ></div>
            <div className="bg-white  absolute bottom-24 pt-3 pb-3 pl-3 pr-8 hover:bg-coffee hover:text-white dark:bg-darkChocolate dark:hover:bg-coffee cursor-pointer">
              Buy Onc Get Onc Free
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </FadeInWhenVisible>
  );
}
