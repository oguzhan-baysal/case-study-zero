# E-Ticaret Uygulaması PRD (Product Requirements Document)

## Genel Bakış

Bu proje, mikro frontend mimarisi kullanarak geliştirilecek bir e-ticaret uygulamasıdır. Proje, ana uygulama (host) ve iki mikro frontend (ürünler ve sepet) olmak üzere üç bileşenden oluşacaktır.

## Teknik Gereksinimler

### 1. Ana Uygulama (Host)
- Next.js 13.4.x kullanılacak
- TypeScript desteği olacak
- Module Federation ile diğer uygulamaları entegre edecek
- Port: 3000

### 2. Ürünler Mikro Frontend'i
- Next.js 13.4.x kullanılacak
- TypeScript desteği olacak
- FakeStore API'den ürün verilerini çekecek
- Redux Toolkit ve RTK Query kullanılacak
- Port: 3001

### 3. Sepet Mikro Frontend'i
- React 18.2.x kullanılacak
- TypeScript desteği olacak
- Redux Toolkit ile sepet yönetimi yapılacak
- Port: 3002

### Ortak Gereksinimler
- Ant Design 5.15.x kullanılacak
- Module Federation için Webpack 5 kullanılacak
- TypeScript 4.9.x kullanılacak

## Fonksiyonel Gereksinimler

### Ana Uygulama
1. Header'da sepet özeti gösterilecek
2. Ana sayfada ürün listesi gösterilecek
3. Ürün detay sayfası olacak

### Ürünler Mikro Frontend'i
1. Ürün listesi gösterilecek
2. Ürün detayları gösterilecek
3. Sepete ekleme fonksiyonu olacak

### Sepet Mikro Frontend'i
1. Sepetteki ürünler listelenecek
2. Ürün miktarı artırılıp azaltılabilecek
3. Ürün sepetten çıkarılabilecek
4. Toplam tutar gösterilecek

## API Entegrasyonu

### FakeStore API
- Endpoint: https://fakestoreapi.com
- Kullanılacak endpointler:
  - GET /products
  - GET /products/{id}
  - GET /products/categories
  - GET /products/category/{category}

## UI/UX Gereksinimleri

1. Responsive tasarım
2. Mobile-first yaklaşım
3. Ant Design bileşenleri kullanılacak
4. Loading state'leri gösterilecek
5. Error state'leri gösterilecek

## Performans Gereksinimleri

1. Lighthouse performans skoru minimum 90
2. First Contentful Paint (FCP) < 1.8s
3. Time to Interactive (TTI) < 3.9s
4. Total Blocking Time (TBT) < 300ms

## Test Gereksinimleri

1. Unit testler yazılacak
2. Integration testler yazılacak
3. E2E testler yazılacak
4. Test coverage minimum %80 olacak

## Güvenlik Gereksinimleri

1. Input validation yapılacak
2. XSS koruması olacak
3. CSRF koruması olacak
4. Rate limiting uygulanacak

## Deployment Gereksinimleri

1. Docker containerization
2. CI/CD pipeline
3. Staging ve production ortamları
4. Monitoring ve logging

## Dokümantasyon Gereksinimleri

1. README dosyası
2. API dokümantasyonu
3. Deployment dokümantasyonu
4. Geliştirici dokümantasyonu