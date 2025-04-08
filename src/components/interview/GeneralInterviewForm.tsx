import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";

interface GeneralInterviewFormProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export default function GeneralInterviewForm({
  input,
  handleInputChange,
  handleSubmit,
  onBack,
}: GeneralInterviewFormProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Lütfen bir alan giriniz");
      return;
    }
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center md:flex-row flex-col md:gap-8 gap-3 bg-black/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm shadow-lg"
    >
      <Image
        src="/startInterview-removebg-preview.png"
        width={300}
        height={300}
        alt="interview"
        className="filter drop-shadow-lg rounded-lg"
      />
      <div className="">
        <h1 className="text-3xl text-center my-2 mb-7 text-gray-200">
          Hangi alanla ilgili bir mülakat yapmak istiyorsunuz?
        </h1>
        <div className="flex gap-4">
          <Input
            placeholder="Örn: Yazılım, tasarım, pazarlama"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="text-white h-full" type="submit">
            Gönder
          </Button>
        </div>
        <Button className="mt-4 w-full" variant="outline" onClick={onBack}>
          Geri Dön
        </Button>
      </div>
    </form>
  );
}
