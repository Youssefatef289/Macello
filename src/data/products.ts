export type CatalogProduct = {
  id: string
  name: string
  description: string
  pricePerKg: number
  image: string
  imageAlt: string
  badge?: string
}

function meatImage(fileName: string) {
  return `/img/meat/${encodeURIComponent(fileName)}`
}

export const heroImage = meatImage('لحم بقرى مكعبات.webp')

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'eskalop',
    name: 'اسكالوب صافى مقطع شرائح رفيعه',
    description: 'شرائح رفيعة للمقلاة والمشويات',
    pricePerKg: 520,
    image: meatImage('اسكالوب صافى مقطع شرائح رفيعه.webp'),
    imageAlt: 'اسكالوب صافى مقطع شرائح رفيعه',
    badge: 'الأكثر طلباً',
  },
  {
    id: 'entrecote',
    name: 'انتركوت بقرى',
    description: 'قطعية مثالية للستيك والمشويات',
    pricePerKg: 590,
    image: meatImage('انتركوت بقرى.webp'),
    imageAlt: 'انتركوت بقرى',
  },
  {
    id: 'burger',
    name: 'برجر بقرى بلدى',
    description: 'جاهز للشوي والطهي السريع',
    pricePerKg: 420,
    image: meatImage('برجر بقرى بلدى.webp'),
    imageAlt: 'برجر بقرى بلدى',
  },
  {
    id: 'bait-kalawy',
    name: 'بيت كلاوى ضانى',
    description: 'مناسب للطواجن والمندي',
    pricePerKg: 640,
    image: meatImage('بيت كلاوى ضانى.jpg'),
    imageAlt: 'بيت كلاوى ضانى',
  },
  {
    id: 'dosh',
    name: 'دوش بقرى',
    description: 'قطعية ممتازة للشواء والطهي',
    pricePerKg: 520,
    image: meatImage('دوش بقرى.webp'),
    imageAlt: 'دوش بقرى',
  },
  {
    id: 'hawawshi',
    name: 'حواوشى عادى  و حار',
    description: 'جاهز للطهي في الفرن أو الطاسة',
    pricePerKg: 380,
    image: meatImage('حواوشى عادى  و حار.webp'),
    imageAlt: 'حواوشى عادى  و حار',
  },
  {
    id: 'rakaba-lamb',
    name: 'رقبه ضانى بلدى',
    description: 'مثالية للسلق والطواجن',
    pricePerKg: 620,
    image: meatImage('رقبه ضانى بلدى.jpg'),
    imageAlt: 'رقبه ضانى بلدى',
  },
  {
    id: 'reesh-lamb',
    name: 'ريش ضانى بلدى',
    description: 'طعم أصيل للمشويات',
    pricePerKg: 640,
    image: meatImage('ريش ضانى بلدى.jpg'),
    imageAlt: 'ريش ضانى بلدى',
  },
  {
    id: 'reesh-png',
    name: 'ريش',
    description: 'ريش للتقديم والمشويات',
    pricePerKg: 640,
    image: meatImage('ريش.png'),
    imageAlt: 'ريش',
  },
  {
    id: 'so2o2',
    name: 'سجق بقرى بلدى',
    description: 'جاهز للشوي والسندويتشات',
    pricePerKg: 420,
    image: meatImage('سجق بقرى بلدى.webp'),
    imageAlt: 'سجق بقرى بلدى',
  },
  {
    id: 'sen',
    name: 'سن بقرى',
    description: 'قطعية للمشويات والفرن',
    pricePerKg: 520,
    image: meatImage('سن بقرى.webp'),
    imageAlt: 'سن بقرى',
  },
  {
    id: 'shawerma',
    name: 'شاورما بقرى',
    description: 'شرائح جاهزة للتسوية',
    pricePerKg: 520,
    image: meatImage('شاورما بقرى.webp'),
    imageAlt: 'شاورما بقرى',
  },
  {
    id: 'rosto',
    name: 'عرق روستو بقرى  صافى',
    description: 'مثالي للروستو والفرن',
    pricePerKg: 560,
    image: meatImage('عرق روستو بقرى  صافى.webp'),
    imageAlt: 'عرق روستو بقرى  صافى',
  },
  {
    id: 'fekda-lamb',
    name: 'فخده ضانى بلدى',
    description: 'مشويات وطواجن',
    pricePerKg: 640,
    image: meatImage('فخده ضانى بلدى.jpg'),
    imageAlt: 'فخده ضانى بلدى',
  },
  {
    id: 'kebda',
    name: 'كبده بقرى شرائح',
    description: 'شرائح سريعة للطهي',
    pricePerKg: 420,
    image: meatImage('كبده بقرى شرائح.webp'),
    imageAlt: 'كبده بقرى شرائح',
  },
  {
    id: 'ketf-lamb',
    name: 'كتف ضانى بلدى',
    description: 'للطهي البطيء والطواجن',
    pricePerKg: 640,
    image: meatImage('كتف ضانى بلدى.jpg'),
    imageAlt: 'كتف ضانى بلدى',
  },
  {
    id: 'kofta-rice',
    name: 'كفته ارز بالحم',
    description: 'جاهزة للطهي',
    pricePerKg: 380,
    image: meatImage('كفته ارز بالحم.webp'),
    imageAlt: 'كفته ارز بالحم',
  },
  {
    id: 'kofta-grill',
    name: 'كفته بقرى شوى',
    description: 'جاهزة للمشويات',
    pricePerKg: 420,
    image: meatImage('كفته بقرى شوى.webp'),
    imageAlt: 'كفته بقرى شوى',
  },
  {
    id: 'kofta',
    name: 'كفته بقرى',
    description: 'جاهزة للطهي',
    pricePerKg: 410,
    image: meatImage('كفته بقرى.webp'),
    imageAlt: 'كفته بقرى',
  },
  {
    id: 'kefna-lamb',
    name: 'كفنه ضانى شوى',
    description: 'مناسبة للشواء',
    pricePerKg: 640,
    image: meatImage('كفنه ضانى شوى.webp'),
    imageAlt: 'كفنه ضانى شوى',
  },
  {
    id: 'beef-cubes',
    name: 'لحم بقرى مكعبات',
    description: 'مكعبات للطواجن والمرق',
    pricePerKg: 520,
    image: meatImage('لحم بقرى مكعبات.webp'),
    imageAlt: 'لحم بقرى مكعبات',
  },
  {
    id: 'lamb-fatta',
    name: 'لحم ضانى الفته',
    description: 'مثالي للفتة',
    pricePerKg: 640,
    image: meatImage('لحم ضانى الفته.webp'),
    imageAlt: 'لحم ضانى الفته',
  },
  {
    id: 'minced-lean',
    name: 'لحم مفروم قليل الدسم',
    description: 'مناسب للطهي الصحي',
    pricePerKg: 450,
    image: meatImage('لحم مفروم قليل الدسم.webp'),
    imageAlt: 'لحم مفروم قليل الدسم',
  },
  {
    id: 'kabab-hela',
    name: 'لحمه كباب حله بقرى قطع متوسطه',
    description: 'قطع متوسطة للطواجن',
    pricePerKg: 520,
    image: meatImage('لحمه كباب حله بقرى قطع متوسطه.webp'),
    imageAlt: 'لحمه كباب حله بقرى قطع متوسطه',
  },
  {
    id: 'minced-balady',
    name: 'لحم مفروم بلدى',
    description: 'مفروم بلدي ممتاز',
    pricePerKg: 450,
    image: meatImage('لحم مفروم بلدى.webp'),
    imageAlt: 'لحم مفروم بلدى',
  },
  {
    id: 'moza-cuts',
    name: 'لحمه موزه فخده قطع',
    description: 'قطع للطهي البطيء',
    pricePerKg: 520,
    image: meatImage('لحمه موزه فخده قطع.webp'),
    imageAlt: 'لحمه موزه فخده قطع',
  },
  {
    id: 'beef-cubes-lean',
    name: 'مكعبات لحم بقرى قليل الدسم',
    description: 'مكعبات قليلة الدسم',
    pricePerKg: 520,
    image: meatImage('مكعبات لحم بقرى قليل الدسم.jpg'),
    imageAlt: 'مكعبات لحم بقرى قليل الدسم',
  },
  {
    id: 'lamb-cubes-bone',
    name: 'مكعبات لحم ضانى بالعظم بلدى',
    description: 'مكعبات بالعظم للطهي',
    pricePerKg: 640,
    image: meatImage('مكعبات لحم ضانى بالعظم بلدى.jpg'),
    imageAlt: 'مكعبات لحم ضانى بالعظم بلدى',
  },
  {
    id: 'mombar',
    name: 'ممبار محشى بالارز',
    description: 'جاهز للطهي',
    pricePerKg: 360,
    image: meatImage('ممبار محشى بالارز.webp'),
    imageAlt: 'ممبار محشى بالارز',
  },
]

export const featuredProducts: CatalogProduct[] = catalogProducts.slice(0, 4)

export const weightOptionsKg = [0.25, 0.5, 1] as const

export function formatEgp(n: number) {
  return `${n.toLocaleString('ar-EG')} ج.م`
}
