import Image from "next/image";

export default function InfoSections() {
  return (
    <>
      <section className="z-10 w-full flex justify-center items-center mt-20">
        <div className="flex flex-col md:flex-row justify-between gap-16 w-3/4">
          <div className="flex flex-col justify-center gap-4 md:w-1/2 w-full">
            <h2 className="text-4xl font-bold text-white">
              Gerçek Deneyim, Gerçek Başarı
            </h2>
            <p className="text-md text-gray-400">
              Binlerce gerçek mülakat sorusu ve deneyimi ile kendinizi test
              edin. Her soru, gerçek iş görüşmelerinden derlenmiş ve sizi
              başarıya hazırlayacak şekilde tasarlanmıştır.
            </p>
          </div>
          <Image
            src="/rigth.jpg"
            alt="wide"
            className="rounded-lg md:w-1/3 w-full h-[300px] object-cover shadow-lg"
            width={1920}
            height={500}
          />
        </div>
      </section>
      <div className="relative w-full h-32 flex items-center justify-center mt-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 animate-pulse border-emerald-800/50"></div>
          <div className="absolute w-16 h-16 rounded-full border-2 animate-pulse border-emerald-800/50"></div>
          <div className="absolute w-8 h-8 rounded-full border-2 animate-pulse border-emerald-800/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 animate-pulse border-emerald-900/50"></div>
          <div className="absolute w-20 h-20 rounded-full border-2 animate-pulse border-emerald-900/50"></div>
          <div className="absolute w-12 h-12 rounded-full border-2 animate-pulse border-emerald-900/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border-2 animate-pulse border-emerald-950/50"></div>
          <div className="absolute w-24 h-24 rounded-full border-2 animate-pulse border-emerald-950/50"></div>
          <div className="absolute w-16 h-16 rounded-full border-2 animate-pulse border-emerald-950/50"></div>
        </div>
      </div>
      <section className="z-10 w-full flex justify-center items-center mt-32 mb-20">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-16 w-3/4">
          <Image
            src="/left.jpg"
            alt="wide"
            className="rounded-lg md:w-1/3 w-full h-[300px] object-cover shadow-lg"
            width={1920}
            height={500}
          />
          <div className="flex flex-col justify-center gap-4 md:w-1/2 w-full">
            <h2 className="text-4xl font-bold text-white">
              Kişiselleştirilmiş Öğrenme
            </h2>
            <p className="text-md text-gray-400">
              Seviyenize ve hedeflerinize uygun mülakat soruları ile kendinizi
              geliştirin. Detaylı geri bildirimler ve çözümler ile her adımda
              ilerlemenizi sağlayın.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
