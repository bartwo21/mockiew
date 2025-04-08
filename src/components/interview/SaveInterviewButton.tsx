import { Button } from "@/components/ui/button";

interface SaveInterviewButtonProps {
  onSave: () => Promise<void>;
  answered: boolean;
}

export default function SaveInterviewButton({
  onSave,
  answered,
}: SaveInterviewButtonProps) {
  return (
    <Button
      onClick={onSave}
      className={`mt-5 w-full ${
        answered ? "bg-secondary text-white" : "bg-primary text-white"
      }`}
      disabled={answered}
    >
      {answered ? "Cevaplandırıldı" : "Cevapla"}
    </Button>
  );
}
