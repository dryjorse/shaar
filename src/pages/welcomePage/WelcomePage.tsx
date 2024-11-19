import { FC } from "react";
import backgroundImage from "../../assets/images/background.jpg";
import { motion } from "framer-motion";

const WelcomePage: FC = () => {
  const variants = {
    initial: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    moveUp: { y: -50 },
  };

  return (
    <div
      className="relative h-screen bg-cover text-white flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.h2
        // variants={variants}
        animate={{ opacity: [0, 1, 1], y: [0, 0, -50] }}
        transition={{
          delay: 0.5,
          duration: 2,
          times: [0, 0.5, 0.5],
        }}
        className="font-bold text-[128px] [text-shadow:_1px_1px_9px_rgba(0,0,0,0.5)]"
      >
        Hello!
      </motion.h2>
    </div>
  );
};

export default WelcomePage;
