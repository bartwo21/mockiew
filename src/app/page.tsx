import { Button } from "@/components/ui/button";
import { CiPlay1 } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const cardData = [
  {
    title: "Kişiselleştirilmiş Sorular",
    description:
      "Girdiğiniz iş tanımına göre özel mülakat soruları ile deneyim kazanın.",
    content:
      "Mülakat soruları, başvurduğunuz pozisyona göre kişiselleştirilir.",
  },
  {
    title: "Deneme Mülakatlar",
    description: "Gerçek mülakat simülasyonları ile kendinizi geliştirin.",
    content:
      "İşe alım süreçlerinde daha iyi sonuç almak için mülakat simülasyonları ile pratik yapın.",
  },
  {
    title: "Geri Bildirim",
    description:
      "Cevaplarınıza göre kişisel geri bildirim alın ve ilerleme kaydedin.",
    content:
      "Sorulara verdiğiniz cevaplara göre size geri bildirim sağlanır ve eksik yönleriniz geliştirilir.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#09090B]">
      <div className="absolute inset-0 bg-grid-pattern -mt-4"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>

      <div className="absolute inset-0 z-20 hidden md:block">
        <div className="absolute top-10 left-60">
          <CiPlay1 className="absolute left-20 -bottom-6 rotate-45" />
          <Avatar className="max-w-20 border-4 w-[60px] h-[60px] border-white">
            <AvatarImage src="/avatar1.jpg" />
          </Avatar>
        </div>

        <div className="absolute bottom-2/4 left-72">
          <CiPlay1 className="absolute left-20 -top-6 -rotate-45" />
          <Avatar className="max-w-20 w-[60px] h-[60px] border-4 border-white">
            <AvatarImage src="/avatar2.jpg" />
          </Avatar>
        </div>

        <div className="absolute bottom-2/4 right-80">
          <CiPlay1 className="absolute right-20 -top-3 rotate-[215deg]" />
          <Avatar className="max-w-20 border-4 w-[60px] h-[60px] border-white">
            <AvatarImage src="/avatar3.jpg" />
          </Avatar>
        </div>

        <div className="absolute top-16 right-64">
          <CiPlay1 className="absolute right-16 -bottom-6 rotate-[135deg]" />
          <Avatar className="max-w-20 border-4 w-[60px] h-[60px] border-white">
            <AvatarImage src="/avatar4.jpg" />
          </Avatar>
        </div>
      </div>

      <section className="relative flex items-center flex-col justify-center container mx-auto text-center mb-20 z-20">
        <h2 className="text-7xl font-bold text-gray-100 mb-6">
          Mülakatlara Hazır Olun
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Gerçek mülakat soruları ile becerilerinizi test edin ve geliştirin.
        </p>
        <Button
          className="px-8 py-4 text-lg hover:text-primary"
          variant="outline"
        >
          Hemen Başla
        </Button>
      </section>

      <section className="relative container mx-auto py-16 z-20">
        <h3 className="text-3xl font-semibold text-gray-100 text-center mb-10">
          Özellikler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
