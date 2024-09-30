/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cardData } from "@/lib/placeHolderDatas";
import { CustomAvatar } from "@/components/home/avatars";
import { FeatureCard } from "@/components/home/features";
import SuccessToast from "@/components/home/SuccessToast";

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

      <div className="absolute inset-0 bg-grid-pattern -mt-4"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="absolute inset-0 z-20 hidden md:block">
        <CustomAvatar
          src="/avatar1.jpg"
          positionStyles="top-10 left-60"
          iconRotation="left-20 -bottom-6 rotate-45"
        />
        <CustomAvatar
          src="/avatar2.jpg"
          positionStyles="top-[380px] left-72"
          iconRotation="left-20 -top-6 -rotate-45"
        />
        <CustomAvatar
          src="/avatar3.jpg"
          positionStyles="top-[420px] right-80"
          iconRotation="right-20 -top-3 rotate-[215deg]"
        />
        <CustomAvatar
          src="/avatar4.jpg"
          positionStyles="top-16 right-64"
          iconRotation="right-16 -bottom-6 rotate-[135deg]"
        />
      </div>
      <section className="relative flex items-center flex-col justify-center container mx-auto text-center mb-20 z-20 md:mt-32 mt-10">
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
      <section className="text-gray-400 body-font w-full z-30">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Mülakatlara hazırlanırken size en iyi deneyimi sunmak için
              buradayız.
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {[
              "Gerçekçi Mülakat Soruları",
              "Kişiselleştirilmiş Geri Bildirim",
              "Kapsamlı İstatistikler",
              "Kolay Kullanım",
              "Uygun Fiyatlandırma",
              "Sürekli Güncellenen İçerik",
            ].map((feature, index) => (
              <div key={index} className="p-2 sm:w-1/2 w-full">
                <div className="bg-zinc-950 border rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-primary w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-white">
                    {feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
