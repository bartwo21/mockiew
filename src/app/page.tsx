/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cardData } from "@/lib/placeHolderDatas";
import { CustomAvatar } from "@/components/home/avatars";
import { FeatureCard } from "@/components/home/features";
import SuccessToast from "@/components/home/SuccessToast";
import Banner from "@/components/home/banner";
import WhyMockiew from "@/components/home/whyMockiew";
import InfoSections from "@/components/home/infoSections";

export default function LandingPage({ searchParams }: { searchParams: any }) {
  const { successLogin, successRegister } = searchParams;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#09090B] px-6">
      <SuccessToast
        success={successLogin || successRegister}
        title={
          successLogin
            ? "Başarıyla giriş yaptınız."
            : "Başarıyla kayıt oldunuz."
        }
      />

      <div className="absolute inset-0 bg-grid-pattern -mt-28"></div>
      <div className="absolute inset-0 bg-radial-gradient -mt-28"></div>
      <div className="absolute inset-0 z-20 hidden md:block">
        <CustomAvatar
          src="/avatar1.jpg"
          positionStyles="top-10 left-[450px]"
          iconRotation="left-20 -bottom-6 rotate-45"
        />
        <CustomAvatar
          src="/avatar2.jpg"
          positionStyles="top-[580px] left-[370px]"
          iconRotation="left-20 -top-6 -rotate-45"
        />
        <CustomAvatar
          src="/avatar3.jpg"
          positionStyles="top-[620px] right-[450px]"
          iconRotation="right-20 -top-3 rotate-[215deg]"
        />
        <CustomAvatar
          src="/avatar4.jpg"
          positionStyles="top-16 right-[490px]"
          iconRotation="right-16 -bottom-6 rotate-[135deg]"
        />
      </div>
      <section className="relative flex items-center flex-col justify-center container mx-auto text-center mb-20 z-20 md:mt-32 mt-10 h-[50vh]">
        <h2 className="md:text-7xl text-4xl font-bold text-gray-100 mb-6">
          Mülakatlara Hazır Olun
        </h2>
        <p className="md:text-lg text-xs text-gray-300 mb-8">
          Gerçek mülakat soruları ile becerilerinizi test edin ve geliştirin.
        </p>
        <Link href="/interview">
          <Button
            className="px-8 py-6 md:text-2xl text-lg hover:text-primary"
            variant="outline"
          >
            Hemen Başla
          </Button>
        </Link>
      </section>

      <section className="relative container mx-auto md:py-16 py-6 z-20 mt-20">
        <h3 className="text-3xl text-gray-100 text-center mb-10">Özellikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              content={card.content}
            />
          ))}
        </div>
      </section>
      <Banner />
      <WhyMockiew />
      <InfoSections />
    </div>
  );
}
