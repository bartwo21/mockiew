export default function WhyMockiew() {
  return (
    <section className="text-gray-400 body-font w-full z-30 mt-20">
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
  );
}
