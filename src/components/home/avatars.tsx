"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CiPlay1 } from "react-icons/ci";
import { motion } from "framer-motion";

interface CustomAvatarProps {
  src: string;
  className?: string;
  positionStyles: string;
  iconRotation: string;
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  className,
  positionStyles,
  iconRotation,
}) => {
  return (
    <motion.div
      className={`absolute ${positionStyles}`}
      initial={{ scale: 0.95 }}
      animate={{
        scale: 1,
        y: [0, -2, 0],
        x: [0, 2, 0],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className={`absolute ${iconRotation}`}>
        <CiPlay1 className="text-primary" />
      </div>
      <div>
        <Avatar
          className={`max-w-20 w-[60px] h-[60px] border-4 border-white transition-all duration-300 hover:border-primary ${className}`}
        >
          <AvatarImage src={src} />
        </Avatar>
      </div>
    </motion.div>
  );
};
