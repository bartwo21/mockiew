import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CiPlay1 } from "react-icons/ci";

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
    <div className={`absolute ${positionStyles}`}>
      <CiPlay1 className={`absolute ${iconRotation}`} />
      <Avatar
        className={`max-w-20 w-[60px] h-[60px] border-4 border-white ${className}`}
      >
        <AvatarImage src={src} />
      </Avatar>
    </div>
  );
};
