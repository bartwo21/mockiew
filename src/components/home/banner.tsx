export default function Banner() {
  return (
    <section className="z-10 w-full flex justify-center items-center relative mt-20">
      <div className="relative w-full md:w-3/4">
        <div className="hero-design-like-image h-[500px] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900/95 to-black/90"></div>

          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>

          <div className="absolute top-1/3 left-1/4 w-0.5 h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent rounded-full transform -rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/4 w-0.5 h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent rounded-full transform rotate-45"></div>

          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-primary/30 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/20 rounded-full blur-[1px]"></div>
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-primary/25 rounded-full blur-[1px]"></div>

          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="text-primary">Kariyerinizin</span> Anahtarı
          </h2>
          <p className="text-xl text-gray-200 text-center max-w-2xl px-4">
            Gerçek mülakat soruları ile becerilerinizi test edin, kendinizi
            geliştirin ve kariyerinizde bir adım{" "}
            <span className="text-primary">öne çıkın</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
