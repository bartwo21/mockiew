import { Button } from "@/components/ui/button";

interface InterviewTypeSelectionProps {
  onSelectType: (type: string) => void;
}

export default function InterviewTypeSelection({
  onSelectType,
}: InterviewTypeSelectionProps) {
  return (
    <div className="bg-black/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Mülakat Tipi Seçimi
        </h2>
        <p className="text-gray-300">
          Hangi tür mülakat sorularını yanıtlamak istersiniz?
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
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
