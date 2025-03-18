# E-Ticaret Mikro Frontend Uygulaması

Bu proje, mikro frontend mimarisi kullanarak React ve Next.js ile geliştirilmiş bir e-ticaret uygulamasıdır.

## Proje Yapısı

Proje üç ana bileşenden oluşmaktadır:

1. **Host App** (Next.js)
   - Ana uygulama
   - Diğer mikro frontendleri birleştirir
   - Port: 3000

2. **Products Remote** (Next.js)
   - Ürün listesi ve detay sayfaları
   - FakeStore API entegrasyonu
   - Port: 3001

3. **Basket Remote** (React)
   - Sepet yönetimi
   - Redux Toolkit ile durum yönetimi
   - Port: 3002

## Teknolojiler

- React 18.2.x
- Next.js 13.4.x
- TypeScript 4.9.x
- Redux Toolkit
- RTK Query
- Ant Design 5.15.x
- Module Federation
- Webpack 5

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/oguzhan-baysal/case-study-zero.git
cd case-study-zero
```

2. Her bir uygulama için bağımlılıkları yükleyin:
```bash
# Host App
cd host-app
npm install

# Products Remote
cd ../products-remote
npm install

# Basket Remote
cd ../basket-remote
npm install
```

3. Uygulamaları başlatın:
```bash
# Her bir terminal penceresinde bir uygulama çalıştırın

# Host App
cd host-app
npm run dev

# Products Remote
cd products-remote
npm run dev

# Basket Remote
cd basket-remote
npm start
```

4. Tarayıcıda aşağıdaki adresleri ziyaret edin:
- Host App: http://localhost:3000
- Products Remote: http://localhost:3001
- Basket Remote: http://localhost:3002

## Özellikler

- Mikro frontend mimarisi
- Module Federation ile uygulama paylaşımı
- Redux Toolkit ile durum yönetimi
- RTK Query ile API entegrasyonu
- Ant Design ile modern UI
- TypeScript ile tip güvenliği

## Lisans

MIT