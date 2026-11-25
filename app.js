/* =========================================================
   ISKANDAR BUILDING — FULL MARKETPLACE ENGINE (ES6+)
   ========================================================= */

(() => {
  'use strict';

  // -------------------- 1. CONSTANTS & DATA --------------------
  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80';

  const DISTRICTS_BY_CITY = {
    'Toshkent': [
      'Yunusobod', 'Chilonzor', 'Mirzo Ulug‘bek', 'Yashnobod',
      'Shayxontohur', 'Yakkasaroy', 'Mirobod', 'Sergeli',
      'Olmazor', 'Uchtepa', 'Bektemir', 'Yangihayot'
    ],
    'Samarqand': ['Samarqand shahri', 'Urgut', 'Kattaqo‘rg‘on', 'Registon hududi', 'Siyob'],
    'Buxoro': ['Buxoro shahri', 'Kogon', 'G‘ijduvon', 'Romitan'],
    'Andijon': ['Andijon shahri', 'Asaka', 'Shahrixon', 'Xonobod'],
    'Namangan': ['Namangan shahri', 'Chust', 'Pop', 'Kosonsoy'],
    'Farg‘ona': ['Farg‘ona shahri', 'Marg‘ilon', 'Qo‘qon', 'Quvasoy'],
    'Nukus': ['Nukus shahri', 'Xo‘jayli', 'Qo‘ng‘irot'],
    'Qarshi': ['Qarshi shahri', 'Shahrisabz', 'Kitob'],
    'Termiz': ['Termiz shahri', 'Denov', 'Sherobod']
  };

  const CITY_COORDS = {
    'Toshkent': [41.3111, 69.2797],
    'Samarqand': [39.6542, 66.9597],
    'Buxoro': [39.7747, 64.4286],
    'Andijon': [40.7821, 72.3442],
    'Namangan': [40.9983, 71.6726],
    'Farg‘ona': [40.3842, 71.7843],
    'Nukus': [42.4619, 59.6166],
    'Qarshi': [38.8606, 65.7891],
    'Termiz': [37.2242, 67.2783]
  };

  const CATEGORIES = [
    { name: 'Kvartira', icon: 'building-2' },
    { name: 'Hovli', icon: 'home' },
    { name: 'Villa', icon: 'castle' },
    { name: 'Kottej', icon: 'trees' },
    { name: 'Ofis', icon: 'briefcase' },
    { name: 'Tijorat binosi', icon: 'store' },
    { name: 'Yer uchastkasi', icon: 'map-pin' },
    { name: 'Yangi qurilgan uylar', icon: 'sparkles' },
    { name: 'Premium uylar', icon: 'crown' },
    { name: 'Ijaraga beriladigan uylar', icon: 'key' }
  ];

  const TRANSLATIONS = {
    uz: {
      demo_notice: "Frontend Demo Rejim: Ma'lumotlar brauzer xotirasida (LocalStorage) saqlanadi. Haqiqiy to'lov va SMS tasdiqlash uchun backend API talab etiladi.",
      nav_home: "Bosh sahifa",
      nav_sale: "Sotuv",
      nav_rent: "Ijara",
      nav_new: "Yangi uylar",
      nav_commercial: "Tijorat",
      nav_realtors: "Rieltorlar",
      nav_login: "Kirish",
      nav_post: "E'lon berish",
      hero_title: "Orzuingizdagi uyni toping",
      hero_subtitle: "O‘zbekiston bo‘ylab minglab ko‘chmas mulk imkoniyatlari sizni kutmoqda. Orzuingizdagi uy — biz bilan bir qadam yaqinroq.",
      tab_all: "Barchasi",
      tab_sale: "Sotib olish",
      tab_rent: "Ijaraga olish",
      lbl_city: "Shahar",
      lbl_district: "Tuman",
      lbl_type: "Uy turi",
      lbl_rooms: "Xonalar soni",
      lbl_min_price: "Minimal narx ($)",
      lbl_max_price: "Maksimal narx ($)",
      btn_search: "QIDIRISH",
      cat_title: "Ko'chmas mulk kategoriyalari",
      listings_title: "Barcha e'lonlar",
      filter_title: "Mukammal filtr",
      filter_clear: "Tozalash",
      realtors_title: "Top Rieltorlarimiz"
    },
    ru: {
      demo_notice: "Демо-режим фронтенда: Данные сохраняются в LocalStorage. Для реальных платежей и SMS требуется backend API.",
      nav_home: "Главная",
      nav_sale: "Продажа",
      nav_rent: "Аренда",
      nav_new: "Новостройки",
      nav_commercial: "Коммерция",
      nav_realtors: "Риелторы",
      nav_login: "Войти",
      nav_post: "Подать объявление",
      hero_title: "Найдите дом своей мечты",
      hero_subtitle: "Тысячи объектов недвижимости по всему Узбекистану ждут вас. Дом мечты — на шаг ближе с нами.",
      tab_all: "Все",
      tab_sale: "Купить",
      tab_rent: "Арендовать",
      lbl_city: "Город",
      lbl_district: "Район",
      lbl_type: "Тип жилья",
      lbl_rooms: "Комнат",
      lbl_min_price: "Мин. цена ($)",
      lbl_max_price: "Макс. цена ($)",
      btn_search: "ПОИСК",
      cat_title: "Категории недвижимости",
      listings_title: "Все объявления",
      filter_title: "Умный фильтр",
      filter_clear: "Сбросить",
      realtors_title: "Наши топ-риелторы"
    },
    en: {
      demo_notice: "Frontend Demo Mode: Data is stored in LocalStorage. Real payments and SMS verification require a backend API.",
      nav_home: "Home",
      nav_sale: "For Sale",
      nav_rent: "For Rent",
      nav_new: "New Buildings",
      nav_commercial: "Commercial",
      nav_realtors: "Realtors",
      nav_login: "Sign In",
      nav_post: "Post Listing",
      hero_title: "Find Your Dream Home",
      hero_subtitle: "Thousands of real estate opportunities across Uzbekistan await you. Your dream home is one step closer.",
      tab_all: "All",
      tab_sale: "Buy",
      tab_rent: "Rent",
      lbl_city: "City",
      lbl_district: "District",
      lbl_type: "Property Type",
      lbl_rooms: "Rooms",
      lbl_min_price: "Min Price ($)",
      lbl_max_price: "Max Price ($)",
      btn_search: "SEARCH",
      cat_title: "Property Categories",
      listings_title: "All Listings",
      filter_title: "Smart Filter",
      filter_clear: "Reset",
      realtors_title: "Our Top Realtors"
    }
  };

  // Curated 30+ unique Unsplash property images
  const PROPERTY_PHOTOS = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80"
  ];

  const REALTORS_DATA = [
    {
      id: 1,
      name: "Azizbek Raximov",
      specialty: "Premium Villalar va Kottejlar",
      experience: "9 yil tajriba",
      phone: "+998 90 911-22-33",
      listingsCount: 42,
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      bio: "Toshkentning markaziy tumanlaridagi elita ko'chmas mulk ob'ektlari bo'yicha yetakchi ekspert."
    },
    {
      id: 2,
      name: "Madina Karimova",
      specialty: "Yangi qurilgan turar-joy majmualari",
      experience: "7 yil tajriba",
      phone: "+998 93 555-44-11",
      listingsCount: 58,
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Novostroykalar va ipoteka dasturlari bo'yicha sertifikatlangan mutaxassis."
    },
    {
      id: 3,
      name: "Jasur Toshmatov",
      specialty: "Tijorat binolari va Ofislar",
      experience: "11 yil tajriba",
      phone: "+998 97 777-88-99",
      listingsCount: 34,
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      bio: "Biznes markazlar, savdo do'konlari va investitsion loyihalar bo'yicha maslahatchi."
    },
    {
      id: 4,
      name: "Nilufar Usmonova",
      specialty: "Uzoq muddatli ijara xizmati",
      experience: "6 yil tajriba",
      phone: "+998 91 333-12-45",
      listingsCount: 64,
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Xorijiy mehmonlar va oilalar uchun qulay ijara xonadonlarini tezkor topish ustasi."
    },
    {
      id: 5,
      name: "Bobur Alimov",
      specialty: "Hovli va Yer uchastkalari",
      experience: "8 yil tajriba",
      phone: "+998 94 600-70-80",
      listingsCount: 29,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Samarqand va Toshkent viloyatidagi keng hovlilar va dala hovlilar bo'yicha mutaxassis."
    },
    {
      id: 6,
      name: "Dilnoza Qodirova",
      specialty: "Evro ta'mirli kvartiralar",
      experience: "5 yil tajriba",
      phone: "+998 99 888-10-20",
      listingsCount: 47,
      photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=400&q=80",
      bio: "Zamonaviy dizayndagi tayyor xonadonlar savdosi va baholash eksperti."
    }
  ];

  // Generate 30 distinct, realistic demo properties
  function generateDefaultProperties() {
    const rawItems = [
      { title: "Yunusobod Residence Premium Kvartira", deal: "Sotuv", cat: "Kvartira", city: "Toshkent", dist: "Yunusobod", addr: "Amir Temur ko'chasi, 45-uy", price: 115000, rooms: 3, area: 98, floor: 7, isNew: true, reno: true, date: "2026-11-24" },
      { title: "Mirzo Ulug'bekda Hashamatli Villa", deal: "Sotuv", cat: "Villa", city: "Toshkent", dist: "Mirzo Ulug‘bek", addr: "Qorasuv-4 dahasi, 12-uy", price: 480000, rooms: 6, area: 420, floor: 2, isNew: true, reno: true, date: "2026-11-23" },
      { title: "Chilonzor-9 Evro Ta'mirli Xonadon", deal: "Ijara", cat: "Ijaraga beriladigan uylar", city: "Toshkent", dist: "Chilonzor", addr: "Qatortol ko'chasi, 18-uy", price: 750, rooms: 2, area: 68, floor: 4, isNew: false, reno: true, date: "2026-11-25" },
      { title: "Tashkent City Boulevard Pentxaus", deal: "Sotuv", cat: "Premium uylar", city: "Toshkent", dist: "Shayxontohur", addr: "Furqat ko'chasi, 1A", price: 360000, rooms: 4, area: 185, floor: 14, isNew: true, reno: true, date: "2026-11-22" },
      { title: "Mirobod Biznes Markazida Tayyor Ofis", deal: "Ijara", cat: "Ofis", city: "Toshkent", dist: "Mirobod", addr: "Nukus ko'chasi, 71", price: 2200, rooms: 5, area: 160, floor: 6, isNew: true, reno: true, date: "2026-11-21" },
      { title: "Yakkasaroyda Keng Zamonaviy Hovli", deal: "Sotuv", cat: "Hovli", city: "Toshkent", dist: "Yakkasaroy", addr: "Shota Rustaveli 2-tor ko'chasi", price: 295000, rooms: 5, area: 310, floor: 2, isNew: false, reno: true, date: "2026-11-20" },
      { title: "Samarqand Registon Yaqinida Kottej", deal: "Sotuv", cat: "Kottej", city: "Samarqand", dist: "Registon hududi", addr: "Mirzo Ulug'bek shoh ko'chasi, 34", price: 175000, rooms: 4, area: 210, floor: 2, isNew: true, reno: true, date: "2026-11-19" },
      { title: "Yashnobod Parkent Plaza Yangi Kvartira", deal: "Sotuv", cat: "Yangi qurilgan uylar", city: "Toshkent", dist: "Yashnobod", addr: "Parkent ko'chasi, 112", price: 82000, rooms: 2, area: 72, floor: 9, isNew: true, reno: false, date: "2026-11-24" },
      { title: "Sergeli Yangi Hayot 3 Xonali Uy", deal: "Sotuv", cat: "Kvartira", city: "Toshkent", dist: "Sergeli", addr: "Yangi Sergeli ko'chasi, 29", price: 64000, rooms: 3, area: 80, floor: 5, isNew: true, reno: true, date: "2026-11-18" },
      { title: "Buxoro Ark Yaqinidagi Tijorat Binolari", deal: "Sotuv", cat: "Tijorat binosi", city: "Buxoro", dist: "Buxoro shahri", addr: "B. Naqshband ko'chasi, 55", price: 240000, rooms: 6, area: 280, floor: 1, isNew: false, reno: true, date: "2026-11-17" },
      { title: "Olmazor City 2 Xonali Shinam Kvartira", deal: "Ijara", cat: "Kvartira", city: "Toshkent", dist: "Olmazor", addr: "Kichik halqa yo'li, 88", price: 650, rooms: 2, area: 62, floor: 6, isNew: true, reno: true, date: "2026-11-23" },
      { title: "Uchtepa Bog'iston Zamonaviy Hovli", deal: "Sotuv", cat: "Hovli", city: "Toshkent", dist: "Uchtepa", addr: "Lutfiy ko'chasi, 41", price: 190000, rooms: 5, area: 260, floor: 1, isNew: false, reno: true, date: "2026-11-16" },
      { title: "Andijon Markazida Yangi Turar-Joy", deal: "Sotuv", cat: "Yangi qurilgan uylar", city: "Andijon", dist: "Andijon shahri", addr: "Bobur shoh ko'chasi, 14", price: 58000, rooms: 3, area: 88, floor: 4, isNew: true, reno: true, date: "2026-11-15" },
      { title: "Namangan Chorsu Savdo Majmuasi Binolari", deal: "Ijara", cat: "Tijorat binosi", city: "Namangan", dist: "Namangan shahri", addr: "Navoiy ko'chasi, 19", price: 1800, rooms: 4, area: 220, floor: 1, isNew: true, reno: true, date: "2026-11-14" },
      { title: "Farg'ona Eco City Premium Kvartira", deal: "Sotuv", cat: "Premium uylar", city: "Farg‘ona", dist: "Farg‘ona shahri", addr: "Mustaqillik ko'chasi, 7", price: 95000, rooms: 4, area: 130, floor: 8, isNew: true, reno: true, date: "2026-11-22" },
      { title: "Bektemir Daryo Bo'yi Kottej Majmuasi", deal: "Sotuv", cat: "Kottej", city: "Toshkent", dist: "Bektemir", addr: "Husayn Boyqaro ko'chasi, 60", price: 145000, rooms: 4, area: 195, floor: 2, isNew: true, reno: true, date: "2026-11-13" },
      { title: "Yangihayot 6 Sotix Yer Uchastkasi", deal: "Sotuv", cat: "Yer uchastkasi", city: "Toshkent", dist: "Yangihayot", addr: "Binokor mahallasi, 15-uchastka", price: 78000, rooms: 1, area: 600, floor: 1, isNew: false, reno: false, date: "2026-11-12" },
      { title: "Yunusobod Mega Planet Yaqinida 1 Xonali", deal: "Ijara", cat: "Ijaraga beriladigan uylar", city: "Toshkent", dist: "Yunusobod", addr: "Ahmad Donish ko'chasi, 22", price: 500, rooms: 1, area: 44, floor: 3, isNew: false, reno: true, date: "2026-11-25" },
      { title: "Nukus Markaziy Kvartira 3 Xonali", deal: "Sotuv", cat: "Kvartira", city: "Nukus", dist: "Nukus shahri", addr: "Do'stlik guzari, 31", price: 52000, rooms: 3, area: 84, floor: 2, isNew: false, reno: true, date: "2026-11-11" },
      { title: "Qarshi Shahrisabz Yo'lida Keng Hovli", deal: "Sotuv", cat: "Hovli", city: "Qarshi", dist: "Qarshi shahri", addr: "Islom Karimov ko'chasi, 102", price: 110000, rooms: 5, area: 340, floor: 1, isNew: false, reno: true, date: "2026-11-10" },
      { title: "Termiz Amudaryo Sohilida Villa", deal: "Sotuv", cat: "Villa", city: "Termiz", dist: "Termiz shahri", addr: "At-Termiziy ko'chasi, 9", price: 215000, rooms: 5, area: 360, floor: 2, isNew: true, reno: true, date: "2026-11-09" },
      { title: "Mirzo Ulug'bek IT Park Yaqinida Ofis", deal: "Ijara", cat: "Ofis", city: "Toshkent", dist: "Mirzo Ulug‘bek", addr: "Mo'minov ko'chasi, 4", price: 1650, rooms: 3, area: 115, floor: 5, isNew: true, reno: true, date: "2026-11-21" },
      { title: "Shayxontohur Labzak Premium Residence", deal: "Sotuv", cat: "Premium uylar", city: "Toshkent", dist: "Shayxontohur", addr: "Labzak ko'chasi, 64", price: 230000, rooms: 4, area: 155, floor: 11, isNew: true, reno: true, date: "2026-11-20" },
      { title: "Mirobod Oybek Metro Yaqinida Ijara", deal: "Ijara", cat: "Ijaraga beriladigan uylar", city: "Toshkent", dist: "Mirobod", addr: "Afrosiyob ko'chasi, 16", price: 1100, rooms: 3, area: 105, floor: 7, isNew: true, reno: true, date: "2026-11-24" },
      { title: "Chilonzor Novza Metro Yangi Uy", deal: "Sotuv", cat: "Yangi qurilgan uylar", city: "Toshkent", dist: "Chilonzor", addr: "Bunyodkor shoh ko'chasi, 52", price: 96000, rooms: 2, area: 76, floor: 10, isNew: true, reno: false, date: "2026-11-19" },
      { title: "Samarqand Siyob Bozor Yaqinida Do'kon", deal: "Sotuv", cat: "Tijorat binosi", city: "Samarqand", dist: "Siyob", addr: "Shohi Zinda ko'chasi, 11", price: 160000, rooms: 2, area: 140, floor: 1, isNew: false, reno: true, date: "2026-11-18" },
      { title: "Yashnobod Tuzel 8 Sotix Yer Uchastkasi", deal: "Sotuv", cat: "Yer uchastkasi", city: "Toshkent", dist: "Yashnobod", addr: "Ohangaron shossesi, 24", price: 135000, rooms: 1, area: 800, floor: 1, isNew: false, reno: false, date: "2026-11-16" },
      { title: "Yakkasaroy Bashliq 2 Xonali Kvartira", deal: "Sotuv", cat: "Kvartira", city: "Toshkent", dist: "Yakkasaroy", addr: "Kichik Beshyog'och, 33", price: 74000, rooms: 2, area: 64, floor: 4, isNew: false, reno: true, date: "2026-11-15" },
      { title: "Buxoro G'ijduvon Yo'lida Kottej", deal: "Sotuv", cat: "Kottej", city: "Buxoro", dist: "G‘ijduvon", addr: "Mustaqillik shoh ko'chasi, 88", price: 125000, rooms: 4, area: 225, floor: 2, isNew: true, reno: true, date: "2026-11-14" },
      { title: "Yunusobod Bog'ishamol Ekologik Villa", deal: "Sotuv", cat: "Villa", city: "Toshkent", dist: "Yunusobod", addr: "Bog'ishamol ko'chasi, 105", price: 540000, rooms: 7, area: 490, floor: 3, isNew: true, reno: true, date: "2026-11-25" }
    ];

    return rawItems.map((item, idx) => {
      const baseCoord = CITY_COORDS[item.city] || [41.3111, 69.2797];
      // Deterministic slight coordinate offset so markers spread nicely across the city
      const latOffset = ((idx % 7) - 3) * 0.014;
      const lngOffset = ((idx % 5) - 2) * 0.018;
      const realtor = REALTORS_DATA[idx % REALTORS_DATA.length];

      const img1 = PROPERTY_PHOTOS[idx % PROPERTY_PHOTOS.length];
      const img2 = PROPERTY_PHOTOS[(idx + 7) % PROPERTY_PHOTOS.length];
      const img3 = PROPERTY_PHOTOS[(idx + 14) % PROPERTY_PHOTOS.length];

      return {
        id: 100 + idx,
        title: item.title,
        deal: item.deal,
        category: item.cat,
        city: item.city,
        district: item.dist,
        address: item.addr,
        price: item.price,
        rooms: item.rooms,
        area: item.area,
        floor: item.floor,
        isNew: item.isNew,
        renovated: item.reno,
        date: item.date,
        lat: +(baseCoord[0] + latOffset).toFixed(5),
        lng: +(baseCoord[1] + lngOffset).toFixed(5),
        images: [img1, img2, img3],
        description: `${item.city} shahri, ${item.dist} tumanida joylashgan zamonaviy va barcha qulayliklarga ega ${item.cat.toLowerCase()}. Yaqin atrofda maktab, bolalar bog'chasi, supermarketlar va jamoat transporti bekatlari mavjud. Hujjatlari to'liq rasmiylashtirilgan.`,
        amenities: ['Wi-Fi / Optik internet', 'Avtoturargoh', '24/7 Qo‘riqlash', 'Isitish tizimi', 'Konditsioner', 'Bolalar maydonchasi'],
        realtor: realtor
      };
    });
  }

  // -------------------- 2. APPLICATION STATE --------------------
  const state = {
    properties: [],
    filtered: [],
    favorites: [],
    compare: [],
    recentlyViewed: [],
    currentUser: null,
    theme: 'light',
    lang: 'uz',
    currentPage: 1,
    perPage: 9,
    viewMode: 'grid', // 'grid' | 'map'
    lightboxImages: [],
    lightboxIndex: 0
  };

  let mainMap = null;
  let markersLayer = null;

  // -------------------- 3. SAFE STORAGE & SANITIZATION --------------------
  function safeGetStorage(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (err) {
      console.warn('LocalStorage read error:', err);
      return fallback;
    }
  }

  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('LocalStorage write error:', err);
    }
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatPrice(price, deal) {
    const formatted = Number(price).toLocaleString('en-US');
    return deal === 'Ijara' ? `$${formatted} <span>/ oyiga</span>` : `$${formatted}`;
  }

  // -------------------- 4. INITIALIZATION --------------------
  function init() {
    const savedCustomProps = safeGetStorage('ib_custom_properties', []);
    state.properties = [...savedCustomProps, ...generateDefaultProperties()];
    state.favorites = safeGetStorage('ib_favorites', []);
    state.compare = safeGetStorage('ib_compare', []);
    state.recentlyViewed = safeGetStorage('ib_recent', []);
    state.currentUser = safeGetStorage('ib_user', null);
    state.theme = safeGetStorage('ib_theme', 'light');
    state.lang = safeGetStorage('ib_lang', 'uz');

    applyTheme(state.theme);
    applyLanguage(state.lang);
    updateAuthUI();
    updateCounters();

    populateDistrictSelect('heroCity', 'heroDistrict');
    populateDistrictSelect('filterCity', 'filterDistrict');
    populateDistrictSelect('newCity', 'newDistrict');

    renderCategories();
    renderRealtors();
    applyFilters(false);
    renderRecentlyViewed();

    bindEvents();
    initIntersectionObserver();
    if (window.lucide) window.lucide.createIcons();
  }

  // -------------------- 5. THEME & LANGUAGE --------------------
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    safeSetStorage('ib_theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function applyLanguage(lang) {
    state.lang = lang;
    safeSetStorage('ib_lang', lang);
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.uz;
    document.getElementById('currentLangLabel').textContent = lang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('#langDropdown button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // -------------------- 6. DISTRICT CASCADE --------------------
  function populateDistrictSelect(citySelectId, districtSelectId) {
    const cityEl = document.getElementById(citySelectId);
    const distEl = document.getElementById(districtSelectId);
    if (!cityEl || !distEl) return;

    const updateDistricts = () => {
      const city = cityEl.value;
      const districts = DISTRICTS_BY_CITY[city] || [];
      const isRequired = distEl.hasAttribute('required');
      distEl.innerHTML = isRequired ? '' : '<option value="">Barcha tumanlar</option>';

      if (!city && !isRequired) {
        // Show Tashkent districts by default or keep all
        DISTRICTS_BY_CITY['Toshkent'].forEach(d => {
          distEl.innerHTML += `<option value="${escapeHTML(d)}">${escapeHTML(d)}</option>`;
        });
      } else {
        districts.forEach(d => {
          distEl.innerHTML += `<option value="${escapeHTML(d)}">${escapeHTML(d)}</option>`;
        });
      }
    };

    cityEl.addEventListener('change', updateDistricts);
    updateDistricts();
  }

  // -------------------- 7. CATEGORIES & REALTORS --------------------
  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => {
      const count = state.properties.filter(p => p.category === cat.name).length;
      return `
        <div class="category-card" data-category="${escapeHTML(cat.name)}">
          <div class="cat-icon"><i data-lucide="${cat.icon}"></i></div>
          <div class="cat-name">${escapeHTML(cat.name)}</div>
          <div class="cat-count">${count} ta e'lon</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        document.getElementById('filterCategory').value = cat;
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        applyFilters(true);
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderRealtors() {
    const grid = document.getElementById('realtorsGrid');
    if (!grid) return;

    grid.innerHTML = REALTORS_DATA.map(r => `
      <div class="realtor-card reveal">
        <div class="realtor-top">
          <img src="${escapeHTML(r.photo)}" alt="${escapeHTML(r.name)}" class="realtor-avatar" onerror="this.src='${FALLBACK_IMG}'" />
          <div class="realtor-info">
            <h3>${escapeHTML(r.name)}</h3>
            <div class="realtor-spec">${escapeHTML(r.specialty)}</div>
          </div>
        </div>
        <div class="realtor-meta">
          <div><strong>Tajriba:</strong> ${escapeHTML(r.experience)}</div>
          <div><strong>E'lonlar:</strong> ${r.listingsCount} ta</div>
        </div>
        <div class="realtor-actions">
          <button class="btn btn-outline btn-sm" onclick="window.openRealtorModal(${r.id})">Profilni ko'rish</button>
          <a href="tel:${escapeHTML(r.phone)}" class="btn btn-primary btn-sm"><i data-lucide="phone"></i> Aloqa</a>
        </div>
      </div>
    `).join('');
  }

  // -------------------- 8. FILTERING & SORTING ENGINE --------------------
  function applyFilters(showSkeleton = true) {
    const deal = document.getElementById('filterDeal').value;
    const city = document.getElementById('filterCity').value;
    const district = document.getElementById('filterDistrict').value;
    const category = document.getElementById('filterCategory').value;
    const activeRoomPill = document.querySelector('#filterRoomPills .pill.active');
    const rooms = activeRoomPill ? activeRoomPill.dataset.room : '';
    const minPrice = parseFloat(document.getElementById('filterMinPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('filterMaxPrice').value) || Infinity;
    const minArea = parseFloat(document.getElementById('filterMinArea').value) || 0;
    const maxArea = parseFloat(document.getElementById('filterMaxArea').value) || Infinity;
    const floor = parseInt(document.getElementById('filterFloor').value, 10) || 0;
    const onlyNew = document.getElementById('filterIsNew').checked;
    const onlyReno = document.getElementById('filterRenovated').checked;
    const keyword = document.getElementById('keywordSearch').value.trim().toLowerCase();
    const sortBy = document.getElementById('sortSelect').value;

    let results = state.properties.filter(p => {
      if (deal && p.deal !== deal) return false;
      if (city && p.city !== city) return false;
      if (district && p.district !== district) return false;
      if (category && p.category !== category) return false;
      if (rooms) {
        const rNum = parseInt(rooms, 10);
        if (rNum === 5 ? p.rooms < 5 : p.rooms !== rNum) return false;
      }
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (p.area < minArea || p.area > maxArea) return false;
      if (floor && p.floor !== floor) return false;
      if (onlyNew && !p.isNew) return false;
      if (onlyReno && !p.renovated) return false;
      if (keyword) {
        const hay = `${p.title} ${p.city} ${p.district} ${p.address} ${p.category}`.toLowerCase();
        if (!hay.includes(keyword)) return false;
      }
      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        results.sort((a, b) => b.area - a.area);
        break;
      case 'rooms_desc':
        results.sort((a, b) => b.rooms - a.rooms);
        break;
      default:
        break;
    }

    state.filtered = results;
    state.currentPage = 1;

    document.getElementById('resultsCountBadge').textContent = `${results.length} ta natija`;

    if (showSkeleton) {
      const skel = document.getElementById('skeletonGrid');
      const grid = document.getElementById('listingsGrid');
      skel.classList.remove('hidden');
      grid.classList.add('hidden');
      setTimeout(() => {
        skel.classList.add('hidden');
        grid.classList.remove('hidden');
        renderListings();
      }, 240);
    } else {
      renderListings();
    }

    updateMapMarkers();
  }

  function clearAllFilters() {
    document.getElementById('filterDeal').value = '';
    document.getElementById('filterCity').value = '';
    populateDistrictSelect('filterCity', 'filterDistrict');
    document.getElementById('filterDistrict').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterMinPrice').value = '';
    document.getElementById('filterMaxPrice').value = '';
    document.getElementById('filterMinArea').value = '';
    document.getElementById('filterMaxArea').value = '';
    document.getElementById('filterFloor').value = '';
    document.getElementById('filterIsNew').checked = false;
    document.getElementById('filterRenovated').checked = false;
    document.getElementById('keywordSearch').value = '';

    document.querySelectorAll('#filterRoomPills .pill').forEach(p => p.classList.remove('active'));
    document.querySelector('#filterRoomPills .pill[data-room=""]').classList.add('active');
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));

    applyFilters(true);
    showToast('Barcha filtrlar tozalandi');
  }

  // -------------------- 9. RENDER LISTINGS & PAGINATION --------------------
  function createPropertyCardHTML(p) {
    const isFav = state.favorites.includes(p.id);
    const isComp = state.compare.includes(p.id);
    const imgSrc = (p.images && p.images[0]) ? p.images[0] : FALLBACK_IMG;

    return `
      <article class="property-card">
        <div class="card-image-wrap">
          <img src="${escapeHTML(imgSrc)}" alt="${escapeHTML(p.title)}" loading="lazy" onerror="this.src='${FALLBACK_IMG}'" />
          <div class="card-badges">
            <span class="deal-badge ${p.deal === 'Sotuv' ? 'sale' : 'rent'}">${escapeHTML(p.deal)}</span>
            ${p.isNew ? '<span class="new-badge">Yangi</span>' : ''}
          </div>
          <div class="card-top-actions">
            <button class="card-action-btn ${isFav ? 'fav-active' : ''}" onclick="window.toggleFavorite(${p.id})" title="Sevimlilarga qo'shish" aria-label="Sevimlilar">
              <i data-lucide="heart"></i>
            </button>
            <button class="card-action-btn ${isComp ? 'compare-active' : ''}" onclick="window.toggleCompare(${p.id})" title="Taqqoslashga qo'shish" aria-label="Taqqoslash">
              <i data-lucide="arrow-left-right"></i>
            </button>
          </div>
          <span class="card-date-tag">${escapeHTML(p.date)}</span>
        </div>

        <div class="card-body">
          <div class="card-price">${formatPrice(p.price, p.deal)}</div>
          <h3 class="card-title" onclick="window.openPropertyDetail(${p.id})">${escapeHTML(p.title)}</h3>
          <div class="card-location">
            <i data-lucide="map-pin"></i>
            <span>${escapeHTML(p.city)}, ${escapeHTML(p.district)}, ${escapeHTML(p.address)}</span>
          </div>

          <div class="card-specs">
            <div class="spec-item"><i data-lucide="door-open"></i> <span>${p.rooms} xona</span></div>
            <div class="spec-item"><i data-lucide="maximize"></i> <span>${p.area} m²</span></div>
            <div class="spec-item"><i data-lucide="layers"></i> <span>${p.floor}-qavat</span></div>
          </div>

          <div class="card-footer">
            <span class="card-category-label">${escapeHTML(p.category)}</span>
            <button class="btn btn-primary btn-sm" onclick="window.openPropertyDetail(${p.id})">Batafsil</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderListings() {
    const grid = document.getElementById('listingsGrid');
    const empty = document.getElementById('emptyState');
    const pagWrap = document.getElementById('paginationWrapper');

    if (state.filtered.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      pagWrap.classList.add('hidden');
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    empty.classList.add('hidden');
    pagWrap.classList.remove('hidden');

    const endIdx = state.currentPage * state.perPage;
    const visibleItems = state.filtered.slice(0, endIdx);

    grid.innerHTML = visibleItems.map(createPropertyCardHTML).join('');
    renderPagination(endIdx);
    if (window.lucide) window.lucide.createIcons();
  }

  function renderPagination(endIdx) {
    const totalPages = Math.ceil(state.filtered.length / state.perPage);
    const numContainer = document.getElementById('paginationNumbers');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    loadMoreBtn.style.display = endIdx >= state.filtered.length ? 'none' : 'inline-flex';

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="window.goToPage(${i})">${i}</button>`;
    }
    numContainer.innerHTML = html;
  }

  window.goToPage = function(page) {
    state.currentPage = page;
    renderListings();
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  };

  // -------------------- 10. LEAFLET.JS & OPENSTREETMAP --------------------
  function initMainMap() {
    if (mainMap) {
      setTimeout(() => mainMap.invalidateSize(), 150);
      return;
    }
    if (typeof L === 'undefined') return;

    mainMap = L.map('propertyMap').setView([41.3111, 69.2797], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mainMap);

    markersLayer = L.layerGroup().addTo(mainMap);
    updateMapMarkers();
  }

  function updateMapMarkers() {
    if (!mainMap || !markersLayer) return;
    markersLayer.clearLayers();

    const bounds = [];
    state.filtered.forEach(p => {
      if (!p.lat || !p.lng) return;
      bounds.push([p.lat, p.lng]);

      const marker = L.marker([p.lat, p.lng]);
      const popupHTML = `
        <div class="map-popup-card">
          <img src="${escapeHTML(p.images[0] || FALLBACK_IMG)}" alt="${escapeHTML(p.title)}" onerror="this.src='${FALLBACK_IMG}'" />
          <h4>${escapeHTML(p.title)}</h4>
          <div class="map-popup-price">$${Number(p.price).toLocaleString()}</div>
          <button class="btn btn-primary btn-sm w-full" onclick="window.openPropertyDetail(${p.id})">Batafsil</button>
        </div>
      `;
      marker.bindPopup(popupHTML);
      markersLayer.addLayer(marker);
    });

    if (bounds.length > 0) {
      mainMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }

  // -------------------- 11. PROPERTY DETAIL MODAL & LIGHTBOX --------------------
  window.openPropertyDetail = function(id) {
    const p = state.properties.find(item => item.id === id);
    if (!p) return;

    // Save to Recently Viewed
    state.recentlyViewed = [id, ...state.recentlyViewed.filter(x => x !== id)].slice(0, 4);
    safeSetStorage('ib_recent', state.recentlyViewed);
    renderRecentlyViewed();

    const imgs = p.images && p.images.length ? p.images : [FALLBACK_IMG];
    const body = document.getElementById('propertyModalBody');

    body.innerHTML = `
      <div class="detail-gallery">
        <div class="detail-main-img" onclick="window.openLightbox(${p.id}, 0)">
          <img src="${escapeHTML(imgs[0])}" alt="${escapeHTML(p.title)}" onerror="this.src='${FALLBACK_IMG}'" />
        </div>
        <div class="detail-thumbs">
          <div class="detail-thumb" onclick="window.openLightbox(${p.id}, 1)">
            <img src="${escapeHTML(imgs[1] || imgs[0])}" alt="Rasm 2" onerror="this.src='${FALLBACK_IMG}'" />
          </div>
          <div class="detail-thumb" onclick="window.openLightbox(${p.id}, 2)">
            <img src="${escapeHTML(imgs[2] || imgs[0])}" alt="Rasm 3" onerror="this.src='${FALLBACK_IMG}'" />
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <div>
          <div style="display:flex; gap:8px; margin-bottom:10px;">
            <span class="deal-badge ${p.deal === 'Sotuv' ? 'sale' : 'rent'}">${escapeHTML(p.deal)}</span>
            <span class="card-category-label">${escapeHTML(p.category)}</span>
            <span class="card-category-label">${escapeHTML(p.date)}</span>
          </div>
          <h2 style="margin-bottom:8px;">${escapeHTML(p.title)}</h2>
          <p class="card-location"><i data-lucide="map-pin"></i> ${escapeHTML(p.city)}, ${escapeHTML(p.district)}, ${escapeHTML(p.address)}</p>

          <div class="card-specs" style="margin:18px 0;">
            <div class="spec-item"><i data-lucide="door-open"></i> <span>${p.rooms} xona</span></div>
            <div class="spec-item"><i data-lucide="maximize"></i> <span>${p.area} m²</span></div>
            <div class="spec-item"><i data-lucide="layers"></i> <span>${p.floor}-qavat</span></div>
          </div>

          <h3>Batafsil tavsif</h3>
          <p style="color:var(--text-muted); margin:10px 0 20px;">${escapeHTML(p.description)}</p>

          <h3>Qulayliklar</h3>
          <div class="detail-amenities">
            ${(p.amenities || []).map(a => `<span class="amenity-chip">✓ ${escapeHTML(a)}</span>`).join('')}
          </div>

          <h3>Xaritadagi joylashuvi</h3>
          <div id="detailMiniMap"></div>
        </div>

        <div>
          <div class="detail-sidebar-card">
            <div class="card-price" style="font-size:1.8rem;">${formatPrice(p.price, p.deal)}</div>
            <hr style="border-color:var(--border);" />
            <div class="realtor-top">
              <img src="${escapeHTML(p.realtor.photo)}" alt="${escapeHTML(p.realtor.name)}" class="realtor-avatar" style="width:56px;height:56px;" onerror="this.src='${FALLBACK_IMG}'" />
              <div>
                <h4>${escapeHTML(p.realtor.name)}</h4>
                <div class="realtor-spec">${escapeHTML(p.realtor.specialty)}</div>
              </div>
            </div>
            <a href="tel:${escapeHTML(p.realtor.phone)}" class="btn btn-primary w-full">
              <i data-lucide="phone"></i> ${escapeHTML(p.realtor.phone)}
            </a>
            <button class="btn btn-outline w-full" onclick="window.toggleFavorite(${p.id}); window.openPropertyDetail(${p.id});">
              <i data-lucide="heart"></i> ${state.favorites.includes(p.id) ? 'Sevimlilardan o‘chirish' : 'Sevimlilarga qo‘shish'}
            </button>
            <button class="btn btn-outline w-full" onclick="window.shareProperty(${p.id})">
              <i data-lucide="share-2"></i> Ulashish
            </button>
          </div>
        </div>
      </div>
    `;

    openModal('propertyModal');
    if (window.lucide) window.lucide.createIcons();

    // Render mini map inside modal
    setTimeout(() => {
      if (typeof L !== 'undefined' && document.getElementById('detailMiniMap')) {
        const miniMap = L.map('detailMiniMap').setView([p.lat, p.lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
        L.marker([p.lat, p.lng]).addTo(miniMap).bindPopup(escapeHTML(p.title)).openPopup();
      }
    }, 200);
  };

  window.openLightbox = function(propId, index) {
    const p = state.properties.find(item => item.id === propId);
    if (!p) return;
    state.lightboxImages = p.images && p.images.length ? p.images : [FALLBACK_IMG];
    state.lightboxIndex = index % state.lightboxImages.length;
    updateLightboxUI();
    openModal('lightboxModal');
  };

  function updateLightboxUI() {
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    img.src = state.lightboxImages[state.lightboxIndex] || FALLBACK_IMG;
    cap.textContent = `Rasm ${state.lightboxIndex + 1} / ${state.lightboxImages.length}`;
  }

  window.shareProperty = function(id) {
    const url = `${window.location.origin}${window.location.pathname}#property-${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => showToast('E’lon havolasi nusxalandi!'));
    } else {
      showToast('Havola: ' + url);
    }
  };

  // -------------------- 12. FAVORITES & COMPARE --------------------
  window.toggleFavorite = function(id) {
    const idx = state.favorites.indexOf(id);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      showToast('Sevimlilardan olib tashlandi');
    } else {
      state.favorites.push(id);
      showToast('Sevimlilarga qo‘shildi ❤️');
    }
    safeSetStorage('ib_favorites', state.favorites);
    updateCounters();
    renderListings();
    renderFavoritesModal();
  };

  function renderFavoritesModal() {
    const body = document.getElementById('favoritesModalBody');
    const favProps = state.properties.filter(p => state.favorites.includes(p.id));

    if (favProps.length === 0) {
      body.innerHTML = `<div class="empty-state"><h3>Sevimlilar ro'yxati bo'sh</h3><p>Yoqqan uylardagi yurakcha belgisini bosing.</p></div>`;
      return;
    }

    body.innerHTML = `<div class="listings-grid" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
      ${favProps.map(createPropertyCardHTML).join('')}
    </div>`;
    if (window.lucide) window.lucide.createIcons();
  }

  window.toggleCompare = function(id) {
    const idx = state.compare.indexOf(id);
    if (idx > -1) {
      state.compare.splice(idx, 1);
      showToast('Taqqoslashdan olib tashlandi');
    } else {
      if (state.compare.length >= 4) {
        showToast('Bir vaqtda maksimal 4 ta uyni taqqoslash mumkin');
        return;
      }
      state.compare.push(id);
      showToast('Taqqoslash ro‘yxatiga qo‘shildi');
    }
    safeSetStorage('ib_compare', state.compare);
    updateCounters();
    renderListings();
    renderCompareModal();
  };

  function renderCompareModal() {
    const body = document.getElementById('compareModalBody');
    const compProps = state.properties.filter(p => state.compare.includes(p.id));

    if (compProps.length === 0) {
      body.innerHTML = `<div class="empty-state"><h3>Taqqoslash uchun uylar tanlanmagan</h3><p>Kartalardagi taqqoslash tugmasini bosing.</p></div>`;
      return;
    }

    body.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <tr>
            <th>Uy</th>
            ${compProps.map(p => `
              <td>
                <img src="${escapeHTML(p.images[0] || FALLBACK_IMG)}" alt="${escapeHTML(p.title)}" onerror="this.src='${FALLBACK_IMG}'" />
                <strong>${escapeHTML(p.title)}</strong>
              </td>
            `).join('')}
          </tr>
          <tr><th>Narx</th>${compProps.map(p => `<td><strong>$${Number(p.price).toLocaleString()}</strong> (${escapeHTML(p.deal)})</td>`).join('')}</tr>
          <tr><th>Shahar / Tuman</th>${compProps.map(p => `<td>${escapeHTML(p.city)}, ${escapeHTML(p.district)}</td>`).join('')}</tr>
          <tr><th>Uy turi</th>${compProps.map(p => `<td>${escapeHTML(p.category)}</td>`).join('')}</tr>
          <tr><th>Maydon</th>${compProps.map(p => `<td>${p.area} m²</td>`).join('')}</tr>
          <tr><th>Xonalar</th>${compProps.map(p => `<td>${p.rooms} xona</td>`).join('')}</tr>
          <tr><th>Qavat</th>${compProps.map(p => `<td>${p.floor}-qavat</td>`).join('')}</tr>
          <tr>
            <th>Amallar</th>
            ${compProps.map(p => `
              <td>
                <button class="btn btn-primary btn-sm" onclick="closeModal('compareModal'); window.openPropertyDetail(${p.id});">Ko'rish</button>
                <button class="btn btn-outline btn-sm" onclick="window.toggleCompare(${p.id})">O'chirish</button>
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
    `;
  }

  function updateCounters() {
    document.getElementById('favCount').textContent = state.favorites.length;
    document.getElementById('compareCount').textContent = state.compare.length;
  }

  // -------------------- 13. RECENTLY VIEWED --------------------
  function renderRecentlyViewed() {
    const sec = document.getElementById('recentlyViewedSection');
    const grid = document.getElementById('recentlyViewedGrid');
    const items = state.recentItems = state.recentlyViewed
      .map(id => state.properties.find(p => p.id === id))
      .filter(Boolean);

    if (items.length === 0) {
      sec.classList.add('hidden');
      return;
    }
    sec.classList.remove('hidden');
    grid.innerHTML = items.map(createPropertyCardHTML).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  // -------------------- 14. ADD NEW LISTING --------------------
  let uploadedBase64Images = [];

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, 4);
    const preview = document.getElementById('imagePreviewGrid');
    preview.innerHTML = '';
    uploadedBase64Images = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        uploadedBase64Images.push(ev.target.result);
        const img = document.createElement('img');
        img.src = ev.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleAddListingSubmit(e) {
    e.preventDefault();
    const city = document.getElementById('newCity').value;
    const baseCoord = CITY_COORDS[city] || [41.3111, 69.2797];

    const newProp = {
      id: Date.now(),
      title: document.getElementById('newTitle').value.trim(),
      deal: document.getElementById('newDeal').value,
      category: document.getElementById('newCategory').value,
      city: city,
      district: document.getElementById('newDistrict').value,
      address: document.getElementById('newAddress').value.trim(),
      price: parseFloat(document.getElementById('newPrice').value) || 50000,
      rooms: parseInt(document.getElementById('newRooms').value, 10) || 2,
      area: parseFloat(document.getElementById('newArea').value) || 65,
      floor: parseInt(document.getElementById('newFloor').value, 10) || 1,
      isNew: true,
      renovated: true,
      date: new Date().toISOString().slice(0, 10),
      lat: +(baseCoord[0] + (Math.random() - 0.5) * 0.02).toFixed(5),
      lng: +(baseCoord[1] + (Math.random() - 0.5) * 0.02).toFixed(5),
      images: uploadedBase64Images.length ? uploadedBase64Images : [FALLBACK_IMG],
      description: document.getElementById('newDescription').value.trim(),
      amenities: ['Yangi e’lon', 'Hujjatlari tayyor', 'Avtoturargoh'],
      realtor: {
        name: state.currentUser ? state.currentUser.name : 'Mulk egasi',
        specialty: 'To‘g‘ridan-to‘g‘ri sotuvchi',
        phone: document.getElementById('newPhone').value.trim(),
        photo: REALTORS_DATA[0].photo
      }
    };

    const customProps = safeGetStorage('ib_custom_properties', []);
    customProps.unshift(newProp);
    safeSetStorage('ib_custom_properties', customProps);

    state.properties.unshift(newProp);
    renderCategories();
    applyFilters(true);

    e.target.reset();
    document.getElementById('imagePreviewGrid').innerHTML = '';
    uploadedBase64Images = [];
    closeModal('addListingModal');
    showToast('E’loningiz muvaffaqiyatli qo‘shildi! 🎉');
  }

  // -------------------- 15. AUTH & REALTOR MODALS --------------------
  let authMode = 'login';

  function updateAuthUI() {
    const btnText = document.getElementById('authBtnText');
    const form = document.getElementById('authForm');
    const profileBox = document.getElementById('userProfileBox');

    if (state.currentUser) {
      btnText.textContent = state.currentUser.name.split(' ')[0];
      form.classList.add('hidden');
      profileBox.classList.remove('hidden');
      document.getElementById('loggedUserName').textContent = state.currentUser.name;
      document.getElementById('loggedUserContact').textContent = state.currentUser.contact;
    } else {
      btnText.textContent = TRANSLATIONS[state.lang].nav_login;
      form.classList.remove('hidden');
      profileBox.classList.add('hidden');
    }
  }

  window.openRealtorModal = function(id) {
    const r = REALTORS_DATA.find(item => item.id === id);
    if (!r) return;
    document.getElementById('realtorModalBody').innerHTML = `
      <div style="text-align:center; padding:12px;">
        <img src="${escapeHTML(r.photo)}" alt="${escapeHTML(r.name)}" class="realtor-avatar" style="width:96px;height:96px;margin:0 auto 14px;" onerror="this.src='${FALLBACK_IMG}'" />
        <h2>${escapeHTML(r.name)}</h2>
        <p class="realtor-spec" style="margin:6px 0 14px;">${escapeHTML(r.specialty)}</p>
        <p style="color:var(--text-muted); margin-bottom:20px;">${escapeHTML(r.bio)}</p>
        <div class="realtor-meta" style="margin-bottom:20px;">
          <div><strong>Ish tajribasi:</strong> ${escapeHTML(r.experience)}</div>
          <div><strong>Faol e'lonlar:</strong> ${r.listingsCount} ta</div>
        </div>
        <a href="tel:${escapeHTML(r.phone)}" class="btn btn-primary w-full"><i data-lucide="phone"></i> Qo'ng'iroq qilish: ${escapeHTML(r.phone)}</a>
      </div>
    `;
    openModal('realtorModal');
    if (window.lucide) window.lucide.createIcons();
  };

  // -------------------- 16. MODALS, TOAST & EVENTS --------------------
  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  };

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  };

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  function bindEvents() {
    // Banner close
    document.getElementById('closeBannerBtn')?.addEventListener('click', () => {
      document.getElementById('demoBanner').style.display = 'none';
    });

    // Navbar scroll & Back to top
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      document.getElementById('navbar').classList.toggle('scrolled', y > 30);
      document.getElementById('backToTopBtn').classList.toggle('visible', y > 450);
    });

    document.getElementById('backToTopBtn').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Language Dropdown
    document.getElementById('langBtn').addEventListener('click', e => {
      e.stopPropagation();
      document.getElementById('langDropdown').classList.toggle('open');
    });
    document.querySelectorAll('#langDropdown button').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
        document.getElementById('langDropdown').classList.remove('open');
      });
    });
    document.addEventListener('click', () => {
      document.getElementById('langDropdown').classList.remove('open');
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      applyTheme(state.theme === 'light' ? 'dark' : 'light');
    });

    // Mobile Drawer
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
      document.getElementById('mobileDrawer').classList.add('open');
    });
    document.getElementById('closeMobileDrawer').addEventListener('click', () => {
      document.getElementById('mobileDrawer').classList.remove('open');
    });

    // Navigation category presets
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobileDrawer').classList.remove('open');
        const nav = link.dataset.nav;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (nav === 'sale') {
          clearAllFilters();
          document.getElementById('filterDeal').value = 'Sotuv';
          applyFilters(true);
        } else if (nav === 'rent') {
          clearAllFilters();
          document.getElementById('filterDeal').value = 'Ijara';
          applyFilters(true);
        } else if (nav === 'new') {
          clearAllFilters();
          document.getElementById('filterIsNew').checked = true;
          applyFilters(true);
        } else if (nav === 'commercial') {
          clearAllFilters();
          document.getElementById('filterCategory').value = 'Tijorat binosi';
          applyFilters(true);
        }
      });
    });

    // Hero Search Tabs & Form
    let heroDeal = '';
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        heroDeal = tab.dataset.deal === 'all' ? '' : tab.dataset.deal;
      });
    });

    document.getElementById('heroSearchForm').addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('filterDeal').value = heroDeal;
      document.getElementById('filterCity').value = document.getElementById('heroCity').value;
      populateDistrictSelect('filterCity', 'filterDistrict');
      document.getElementById('filterDistrict').value = document.getElementById('heroDistrict').value;
      document.getElementById('filterCategory').value = document.getElementById('heroCategory').value;
      document.getElementById('filterMinPrice').value = document.getElementById('heroMinPrice').value;
      document.getElementById('filterMaxPrice').value = document.getElementById('heroMaxPrice').value;

      const hRooms = document.getElementById('heroRooms').value;
      document.querySelectorAll('#filterRoomPills .pill').forEach(p => {
        p.classList.toggle('active', p.dataset.room === hRooms);
      });

      applyFilters(true);
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });

    // Quick Search Chips
    document.querySelectorAll('.tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        clearAllFilters();
        if (chip.dataset.quickCity) {
          document.getElementById('filterCity').value = chip.dataset.quickCity;
          populateDistrictSelect('filterCity', 'filterDistrict');
        }
        if (chip.dataset.quickDistrict) {
          document.getElementById('filterDistrict').value = chip.dataset.quickDistrict;
        }
        if (chip.dataset.quickCat) {
          document.getElementById('filterCategory').value = chip.dataset.quickCat;
        }
        applyFilters(true);
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Sidebar Live Filters
    ['filterDeal', 'filterCity', 'filterDistrict', 'filterCategory', 'filterMinPrice', 'filterMaxPrice', 'filterMinArea', 'filterMaxArea', 'filterFloor', 'filterIsNew', 'filterRenovated', 'sortSelect'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => applyFilters(true));
    });

    document.querySelectorAll('#filterRoomPills .pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#filterRoomPills .pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        applyFilters(true);
      });
    });

    // Debounced Keyword Search
    let debounceTimer;
    document.getElementById('keywordSearch').addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => applyFilters(false), 280);
    });

    document.getElementById('quickSearchBtn').addEventListener('click', () => {
      document.getElementById('keywordSearch').focus();
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });

    // Reset Buttons
    document.getElementById('clearFiltersBtn').addEventListener('click', clearAllFilters);
    document.getElementById('emptyResetBtn').addEventListener('click', clearAllFilters);
    document.getElementById('resetCatBtn').addEventListener('click', clearAllFilters);

    // Load More
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
      state.currentPage += 1;
      renderListings();
    });

    // Grid / Map Toggle
    document.getElementById('viewGridBtn').addEventListener('click', () => {
      state.viewMode = 'grid';
      document.getElementById('viewGridBtn').classList.add('active');
      document.getElementById('viewMapBtn').classList.remove('active');
      document.getElementById('mapWrapper').classList.add('hidden');
    });

    document.getElementById('viewMapBtn').addEventListener('click', () => {
      state.viewMode = 'map';
      document.getElementById('viewMapBtn').classList.add('active');
      document.getElementById('viewGridBtn').classList.remove('active');
      document.getElementById('mapWrapper').classList.remove('hidden');
      initMainMap();
    });

    // Favorites & Compare Modals
    document.getElementById('favoritesBtn').addEventListener('click', () => {
      renderFavoritesModal();
      openModal('favoritesModal');
    });

    document.getElementById('compareBtn').addEventListener('click', () => {
      renderCompareModal();
      openModal('compareModal');
    });

    document.getElementById('clearCompareBtn').addEventListener('click', () => {
      state.compare = [];
      safeSetStorage('ib_compare', []);
      updateCounters();
      renderListings();
      renderCompareModal();
    });

    // Clear Recently Viewed
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
      state.recentlyViewed = [];
      safeSetStorage('ib_recent', []);
      renderRecentlyViewed();
    });

    // Add Listing Modal
    ['addListingBtn', 'mobileAddBtn', 'footerAddBtn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('mobileDrawer').classList.remove('open');
        openModal('addListingModal');
      });
    });

    document.getElementById('newImages').addEventListener('change', handleImageUpload);
    document.getElementById('addListingForm').addEventListener('submit', handleAddListingSubmit);

    // Auth Modal
    ['authBtn', 'mobileAuthBtn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => {
        document.getElementById('mobileDrawer').classList.remove('open');
        openModal('authModal');
      });
    });

    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        authMode = tab.dataset.authMode;
        document.getElementById('authNameGroup').style.display = authMode === 'register' ? 'flex' : 'none';
        document.getElementById('authModalTitle').textContent = authMode === 'register' ? "Ro'yxatdan o'tish" : "Tizimga kirish";
        document.getElementById('authSubmitBtn').textContent = authMode === 'register' ? "Ro'yxatdan o'tish" : "Kirish";
      });
    });

    document.getElementById('authForm').addEventListener('submit', e => {
      e.preventDefault();
      const contact = document.getElementById('authContact').value.trim();
      const name = document.getElementById('authName').value.trim() || contact.split('@')[0] || 'Foydalanuvchi';
      state.currentUser = { name, contact };
      safeSetStorage('ib_user', state.currentUser);
      updateAuthUI();
      closeModal('authModal');
      showToast(`Xush kelibsiz, ${name}!`);
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      state.currentUser = null;
      safeSetStorage('ib_user', null);
      updateAuthUI();
      showToast('Tizimdan chiqdingiz');
    });

    // Consultation Form
    document.getElementById('consultationForm').addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('consultName').value.trim();
      e.target.reset();
      showToast(`Rahmat, ${name}! So‘rovingiz qabul qilindi, mutaxassisimiz tez orada bog‘lanadi.`);
    });

    // FAQ & Privacy Modals
    document.getElementById('openFaqBtn').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('infoModalTitle').textContent = "Ko'p beriladigan savollar (FAQ)";
      document.getElementById('infoModalBody').innerHTML = `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div><strong>1. E'lon joylashtirish bepulmi?</strong><p style="color:var(--text-muted);">Ha, platformamizda dastlabki e'lonlarni joylashtirish mutlaqo bepul.</p></div>
          <div><strong>2. Uylarning hujjatlari tekshirilganmi?</strong><p style="color:var(--text-muted);">Rieltorlarimiz tomonidan joylangan barcha ob'ektlar birlamchi yuridik tekshiruvdan o'tadi.</p></div>
          <div><strong>3. Ipoteka orqali uy sotib olsa bo'ladimi?</strong><p style="color:var(--text-muted);">Ha, "Yangi qurilgan uylar" bo'limidagi aksariyat majmualarda bank ipotekasi va bo'lib to'lash mavjud.</p></div>
        </div>
      `;
      openModal('infoModal');
    });

    document.getElementById('openPrivacyBtn').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('infoModalTitle').textContent = "Maxfiylik siyosati";
      document.getElementById('infoModalBody').innerHTML = `
        <p style="color:var(--text-muted);">ISKANDAR BUILDING foydalanuvchilarning shaxsiy ma'lumotlari xavfsizligini qadrlaydi. Demo rejimda barcha kiritilgan ma'lumotlar faqat sizning qurilmangizdagi brauzer xotirasida (LocalStorage) saqlanadi va uchinchi shaxslarga uzatilmaydi.</p>
      `;
      openModal('infoModal');
    });

    // Lightbox navigation
    document.getElementById('lightboxPrev').addEventListener('click', () => {
      state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxImages.length) % state.lightboxImages.length;
      updateLightboxUI();
    });
    document.getElementById('lightboxNext').addEventListener('click', () => {
      state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxImages.length;
      updateLightboxUI();
    });

    // Close modals via button, backdrop click, or Escape key
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) closeModal(backdrop.id);
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
        document.getElementById('mobileDrawer').classList.remove('open');
      }
    });
  }

  // Start App when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();