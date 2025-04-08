import { Button } from "@/components/ui/button";

interface NewInterviewButtonProps {
  onStartNewInterview: () => void;
  isLoading: boolean;
}

export default function NewInterviewButton({
  onStartNewInterview,
  isLoading,
}: NewInterviewButtonProps) {
  return (
    <div className="text-right">
      <Button
        className="text-white mt-4 text-xs bg-secondary"
        onClick={onStartNewInterview}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex space-x-2 justify-center items-center pr-2">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          "Yeni mülakat için tıklayınız"
        )}
      </Button>
    </div>
  );
}
