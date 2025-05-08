import { Button } from "@/components/ui/button";

interface InterviewTypeSelectionProps {
  onSelectType: (type: string) => void;
}

export default function InterviewTypeSelection({
  onSelectType,
}: InterviewTypeSelectionProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-6xl font-bold text-primary mb-8">
          Mülakat Tipi Seçimi
        </h2>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:justify-between w-1/2 mx-auto">
        <div className="border rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            Genel Mülakat Soruları
          </h3>
          <p className="text-gray-400 mb-4">
            Temel yetkinlikler ve deneyimler hakkında sorular
          </p>
          <Button
            className="w-full bg-secondary/30 hover:bg-secondary/50 text-white"
            onClick={() => onSelectType("general")}
          >
            Seç
          </Button>
        </div>
        <div className="border rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            Kod Yazma Sorusu
          </h3>
          <p className="text-gray-400 mb-4">
            Algoritma ve programlama bilgilerini ölçen bir soru
          </p>
          <Button
            className="w-full bg-secondary/30 hover:bg-secondary/50 text-white"
            onClick={() => onSelectType("code")}
          >
            Seç
          </Button>
        </div>
      </div>
    </div>
  );
}
