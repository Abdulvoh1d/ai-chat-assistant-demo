# AI Chat Assistant

Brauzerda ishlaydigan ushbu chat interfeysi oldindan yozilgan mahalliy namunaviy javoblar orqali suhbat tajribasini ko‘rsatadi; u jonli AI xizmatiga ulanmaydi.

## Havolalar

- [Jonli demo](https://ai-chat-assistant-demo.netlify.app)
- [GitHub repository](https://github.com/Abdulvoh1d/ai-chat-assistant-demo)

## Loyiha nimani ko‘rsatadi

Loyiha — chat ilovasining foydalanuvchi interfeysi va brauzer ichidagi sodda muloqot oqimi uchun namuna. Unda xabarlar ro‘yxati, yozish maydoni, tavsiya etilgan so‘rovlar va suhbatni yangidan boshlash boshqaruvlari bor. Javoblar faqat JavaScript ichida belgilangan matnlardan tanlanadi.

## Tasdiqlangan funksiyalar

- Xabarni yozib, **Send** tugmasi yoki **Enter** bilan yuborish; **Shift + Enter** yangi qator kiritadi.
- Yuborishdan oldin tavsiya etilgan so‘rovni yozish maydoniga qo‘yib, tahrirlash.
- Xabarni suhbatga qo‘shish va kalit so‘zlarga mos namunaviy javobni qisqa kutishdan so‘ng ko‘rsatish; mos kelmasa umumiy namuna javobi ishlatiladi.
- **New conversation** yoki suhbatni yangilash tugmasi orqali suhbatni tozalash; **Ctrl + K** yoki **⌘ + K** klaviatura yorlig‘i ham shu amalni bajaradi.
- Yordam tugmasi orqali demo haqida vaqtincha xabar ko‘rsatish.
- Kichik ekranlarga moslashuvchi ko‘rinish, klaviatura fokus belgilari va assistive texnologiyalar uchun xabarlar oqimi belgilari.
- Xabar matni ko‘pi bilan 1 200 belgidan iborat bo‘lishi mumkin.

## Texnologiyalar

- HTML5
- CSS3
- Vanilla JavaScript
- Brauzer API’lari: DOM hodisalari va elementlar bilan ishlash, `window.setTimeout`, `Intl.DateTimeFormat` hamda `Date`.

Loyiha statik fayllardan iborat; npm o‘rnatish yoki build bosqichi talab qilinmaydi.

## Talablar va mahalliy ishga tushirish

Python 3 va zamonaviy veb-brauzer kerak. Terminalda quyidagilarni bajaring:

```sh
git clone https://github.com/Abdulvoh1d/ai-chat-assistant-demo.git
cd ai-chat-assistant-demo
python3 -m http.server 8765
```

Brauzerda [http://localhost:8765](http://localhost:8765) manzilini oching. `npm install` yoki build buyrug‘i kerak emas.

## Fayl tuzilishi

```text
ai-chat-assistant-demo/
├── index.html   # Sahifa tuzilishi va chat interfeysi
├── styles.css   # Ko‘rinish, moslashuvchan joylashuv va animatsiyalar
├── app.js       # Mahalliy muloqot mantig‘i va namuna javoblari
└── README.md    # Loyiha haqida ma’lumot va ishga tushirish yo‘riqnomasi
```

## Ma’lumotlar, maxfiylik va demo-chegaralari

Yuborilgan xabarlar va javoblar joriy sahifadagi xotirada bo‘ladi. Sahifani yangilash yoki suhbatni tozalash ularni olib tashlaydi; ilova suhbat tarixini saqlamaydi. Chat javoblari oldindan yozilgan andozalardan mahalliy JavaScript orqali tanlanadi — jonli AI yoki tashqi API ulanmagan. Maxfiy ma’lumot yubormang.

Bu faqat interfeys namunasi: javoblar sun’iy, umumiy va xato yoki mos kelmasligi mumkin. Ular maslahat, tekshirilgan fakt yoki haqiqiy AI xulosasi emas.

## Litsenziya

Repository’da `LICENSE` fayli yo‘q. Ommaviy repository bo‘lishi o‘z-o‘zidan kodga ochiq litsenziya bermaydi; qayta ishlatish shartlarini muallif bilan aniqlang.
