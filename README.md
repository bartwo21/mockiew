# Mock Interview Platform

Mock Interview platformu, kullanıcıların dinamik mülakat sorularına cevap verebileceği ve yapay zeka tarafından oluşturulan geri bildirimler alabileceği bir projedir. **Next.js**, **MongoDB**, **Vercel AI SDK**, ve **Shadcn** teknolojileri kullanılarak geliştirilmiştir.

## Özellikler

- **Dinamik Mülakat Soruları**: Vercel AI SDK kullanarak iş tanımına göre oluşturulan sorular.
- **Geri Bildirim Sistemi**: Kullanıcı cevaplarına yapay zeka tabanlı geri bildirim.
- **Kullanıcı Yönetimi**: Giriş, kayıt ve kullanıcı dashboard'u.
- **Veri Saklama**: Kullanıcı verileri ve mülakat bilgileri MongoDB'de saklanır.
- **Shadcn UI Bileşenleri**: Kullanıcı dostu ve sade bir arayüz tasarımı.

## Kullanılan Teknolojiler

- **Next.js**: Frontend ve API Routes.
- **MongoDB**: Veritabanı.
- **Vercel AI SDK**: Dinamik mülakat sorularını oluşturmak için.
- **Shadcn UI**: Kullanıcı arayüzü bileşenleri.

## Kurulum

Projeyi klonlayarak ve gerekli bağımlılıkları yükleyerek çalıştırabilirsiniz.

```bash
git clone https://github.com/kullanici/mock-interview-platform.git
cd mock-interview-platform
npm install
npm run dev
