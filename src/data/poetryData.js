export const GENRES_LIST = [
  { label: "تمام اصناف", value: "all" },
  { label: "حمد (Hamd)", value: "حمد", slug: "hamd" },
  { label: "نعت (Naat)", value: "نعت", slug: "naat" },
  { label: "قصیدہ (Qaseeda)", value: "قصیدہ", slug: "qaseeda" },
  { label: "منقبت (Manqabat)", value: "منقبت", slug: "manqabat" },
  { label: "نوحہ (Noha)", value: "نوحہ", slug: "noha" },
  { label: "سلام (Salam)", value: "سلام", slug: "salam" },
  { label: "مرثیہ (Marsiya)", value: "مرثیہ", slug: "marsiya" },
];

export const LANGUAGES_LIST = [
  { label: "اردو (Urdu)", value: "Urdu" },
  { label: "سنڌي (Sindhi)", value: "Sindhi" },
  { label: "پنجابي (Punjabi)", value: "Punjabi" },
  { label: "سرائیکی (Saraiki)", value: "Saraiki" },
  { label: "مختلف / دیگر (Other)", value: "Other" },
];

// LIST 1: ولادت، اعیاد، جشن و خوشی (Joyous / Celebratory Occasions)
export const OCCASIONS_LIST_1 = [
  "ولادت حضرت امام موسٰي ڪاظم عہ",
  "عيد ِ زهرا - عيد ِ شجاع - تاج پوشي امام ِ زمانهٰ",
  "ولادت حضرت محمڊ مصطفيٰ  صہ",
  "ولادت حضرت امام جعفر صادق عہ",
  "ولادت حضرت بيبي امّ ِ ڪلثوم عہ",
  "ولادت حضرت امام حسن عسڪري عہ",
  "ولادت حضرت بيبي  فاطمه زهرا عہ",
  "ولادت حضرت امام  محمد باقر عہ",
  "ولادت حضرت امام علي نقي عہ",
  "ولادت حضرت علي اصغر عہ",
  "ولادت حضرت امام محمد تقي عہ",
  "ولادت حضرت امام علي عہ",
  "ولادت حضرت بيبي سڪينه عہ",
  "نياز حضرت امام جعفر صادق عہ (ڪونڊا)",
  "معراج",
  "آمد ِ شعبان",
  "ولادت حضرت زينب عہ",
  "ولادت حضرت امام حسين عہ",
  "ولادت حضرت عباس غازي علمدار عہ",
  "ولادت حضرت امام زين العابدين عہ",
  "ولادت حضرت قاسم ابن حسن عہ",
  "ولادت حضرت علي اڪبر عہ",
  "ولادت حضرت امام مهدي عہ",
  "رمضان نعت",
  "ولادت حضرت اامام حسن عہ",
  "ولادت حضرت امام علي رضا عہ",
  "عقد حضرت زهرا و امام علي  عہ",
  "سفر حج",
  "عيد ِ غدير - عليا والي الله",
  "عيد ِ مباهلا",
  "زواري",
  "دهمال شهباز قلندر",
  "نياز امام حسن",
  "ديگر عنوان"
];

// LIST 2: محرم الحرام، مصائب و شہادت (Aza & Mourning Occasions)
export const OCCASIONS_LIST_2 = [
  "آمد ِ  محرم",
  "حضرت عباس علمدار عہ",
  "حضرت بيبي  فاطمه صغرا عہ",
  "حضرت علي اڪبر عہ",
  "حضرت قاسم ابن حسن عہ",
  "حضرت علي اصغر عہ",
  "حضرت امام حسين عہ",
  "شهداءِ ڪربلا",
  "شام ِ غريبان",
  "سفر اهل ِ حرم بازار و دربار ِ شام",
  "حضرت امام زين العابدين عہ",
  "حضرت بيبي  فضه عہ",
  "حضرت بيبي سڪينه عہ",
  "چهلم",
  "آمد ِ قافلا 8 ربيع الاول",
  "حضرت امام حسن عسڪري عہ",
  "حضرت ابو طالب عہ",
  "حضرت بيبي  فاطمه زهرا عہ",
  "حضرت امام علي نقي عہ",
  "حضرت امام موسٰي ڪاظم عہ",
  "روانگي قافلا",
  "حضرت بيبي خديجهٰ عہ",
  "حضرت امام علي عہ",
  "انهدام جنت البقيعه",
  "حضرت امام جعفر صادق عہ",
  "حضرت امام علي رضا عہ",
  "حضرت امام محمد تقي عہ",
  "حضرت امام  محمد باقر عہ",
  "روانگي قافلا 8 ذي الحج مڪه تا ڪربلا",
  "حضرت مسلم عہ",
  "فرزندان ِ حضرت مسلم عہ",
  "حضرت زينب عہ",
  "عزاداري",
  "زواري"
];

// Preloaded poetry collection with direct YouTube links
export const POETRY_DATABASE = [
  {
    id: "pasliyan-tootay-tow-hoti",
    titleUrdu: "پسلیاں ٹوٹے تو ہوتی ہیں قیامت زہراؑ",
    titleRoman: "Pasliyan Tootay Tow Hoti Hain Qayamat Zehra",
    firstVerse: "پسلیاں ٹوٹے تو ہوتی ہیں قیامت زہراؑ\nکون سمجھے گا بھلا آپ کی غربت زہراؑ",
    fullKalam: `پسلیاں ٹوٹے تو ہوتی ہیں قیامت زہراؑ
کون سمجھے گا بھلا آپ کی غربت زہراؑ

در گرا، آگ لگی، محسنِ مظلوم گیا
کس پہ گزری ہے بتاؤ یہ مصیبت زہراؑ

رو نہ پائیں جو مدینے میں پدر کے غم میں
کس قدر تنگ تھی دنیا کی عدالت زہراؑ

رات کی چادر میں دفنایا علیؑ نے تم کو
چھپ گئی خاک کے پردے میں امانت زہراؑ

ثناگرؔ اشکوں میں سموئے ہے عقیدت اپنی
حشر کے روز میسر ہو شفاعت زہراؑ`,
    genre: "نوحہ",
    genreSlug: "noha",
    occasion: "حضرت بيبي  فاطمه زهرا عہ",
    reciter: "سجاد حسین سجاد (Sajjad Hussain Sajjad)",
    reciterSlug: "sajjad-hussain",
    youtubeUrl: "https://www.youtube.com/results?search_query=Pasliyan+Tootay+Tow+Hoti+Sanagar+Hussaini",
    year: "2024",
    language: "Urdu",
    popular: true,
    views: "48K",
  },
  {
    id: "nam-ali-ka",
    titleUrdu: "نام علیؑ کا لو تو دھڑکتا ہے دل مرا",
    titleRoman: "Nam Ali Ka Lo To Dharakta Hai Dil Mera",
    firstVerse: "نام علیؑ کا لو تو دھڑکتا ہے دل مرا\nکعبے کا یہ مکین ہے، بانی نماز کا",
    fullKalam: `نام علیؑ کا لو تو دھڑکتا ہے دل مرا
کعبے کا یہ مکین ہے، بانی نماز کا

دستِ خدا ہے، جانِ پیمبرؐ کا رازدار
جس نے سنوار ڈالا مقدر جہان کا

خیبر میں جس کی ضرب بنی موت کفر کی
میدانِ بندگی میں جو سردار تھا بنا

جب بھی پکارا ہم نے مصیبت میں یاعلیؑ
ہر موڑ پر ملا ہمیں امداد کا پتا

ثناگرؔ مری بساط ہی کیا مدحتِ علیؑ میں
قرآن خود ہے مدح سرا بوترابؑ کا`,
    genre: "منقبت",
    genreSlug: "manqabat",
    occasion: "ولادت حضرت امام علي عہ",
    reciter: "خوکھر برادرز (Khokhar Brothers)",
    reciterSlug: "khokhar-brothers",
    youtubeUrl: "https://www.youtube.com/results?search_query=Nam+Ali+Ka+Lo+To+Dharakta+Hai+Khokhar+Brothers",
    year: "2023",
    language: "Urdu",
    popular: true,
    views: "92K",
  },
  {
    id: "zehra-ka-hu-musalla",
    titleUrdu: "زہراؑ کا ہو مصلٰی یا خون کا سمندر",
    titleRoman: "Zehra Ka Hu Musalla Ya Khoon Ka Samandar",
    firstVerse: "زہراؑ کا ہو مصلٰی یا خون کا سمندر\nشبیرؑ نے ادا کی سجدے میں ہر امانت",
    fullKalam: `زہراؑ کا ہو مصلٰی یا خون کا سمندر
شبیرؑ نے ادا کی سجدے میں ہر امانت

نوکِ سناں پہ سر تھا، لب پر کلامِ رب تھا
دیکھی فلک نے کیسی میدان میں شجاعت

عباسؑ کے قلم شانے بتا رہے ہیں
کس طرح باوفا نے نبھائی ہے رفاقت

اصغرؑ کی مسکراہٹ نے حرملہ کو مارا
چھوٹے سے اک گلے نے بخشی بقائے ملت

ثناگرؔ قلم کا سجدہ قبول ہو حرم میں
لکھتا رہوں سدا میں شبیرؑ کی مدحت`,
    genre: "سلام",
    genreSlug: "salam",
    occasion: "آمد ِ  محرم",
    reciter: "ثناگر حسینی (خود نوشتہ و ترنم)",
    reciterSlug: "sanagar-hussaini",
    youtubeUrl: "https://www.youtube.com/results?search_query=Zehra+Ka+Hu+Musalla+Sanagar+Hussaini",
    year: "2024",
    language: "Urdu",
    popular: true,
    views: "34K",
  },
  {
    id: "baba-jay-bina-zehra",
    titleUrdu: "بابا جي بنا زهراؑ اڪيلي رهجي ويئي (سنڌي)",
    titleRoman: "Baba Jay Bina Zehra Akeli Rahji Wayi (Sindhi)",
    firstVerse: "بابا جي بنا زهراؑ اڪيلي رهجي ويئي\nروئي ٿي رات ڏينهان درداڻي ٿي پئي",
    fullKalam: `بابا جي بنا زهراؑ اڪيلي رهجي ويئي
روئي ٿي رات ڏينهان درداڻي ٿي پئي

ڪو نه آيو پرچائڻ، سڀ ٿيا بيوفا هتي
روئڻ تي به مديني ۾ بندش لڳي وئي

محسن به شهيد ٿيو ۽ دروازو سڙي پيو
غم جي انهيءَ باهه ۾ زندگي وهي وئي

ثناگرؔ اها پيڙا ڪير لکي سگهندو ڀلا
جنهن جي پٺيان جهان جي هاءِ لڄ لهي وئي`,
    genre: "نوحہ",
    genreSlug: "noha",
    occasion: "حضرت بيبي  فاطمه زهرا عہ",
    reciter: "ذاکر علی حسن (Zakir Ali Hassan)",
    reciterSlug: "zakir-ali-hassan",
    youtubeUrl: "https://www.youtube.com/results?search_query=Baba+Jay+Bina+Zehra+Sindhi+Noha+Sanagar+Hussaini",
    year: "2023",
    language: "Sindhi",
    popular: true,
    views: "27K",
  },
  {
    id: "zehra-ki-piyari-zainab",
    titleUrdu: "زہراؑ کی پیاری زینبؑ کوفے میں بے ردا تھی",
    titleRoman: "Zehra Ki Piyari Zainab Kufay Mein Be Rida Thi",
    firstVerse: "زہراؑ کی پیاری زینبؑ کوفے میں بے ردا تھی\nخطبہ علیؑ کے لہجے میں دے کے وہ ڈٹ گئی تھی",
    fullKalam: `زہراؑ کی پیاری زینبؑ کوفے میں بے ردا تھی
خطبہ علیؑ کے لہجے میں دے کے وہ ڈٹ گئی تھی

بازارِ شام کانپا ثانیِ زہراؑ دیکھ کر
دربار میں یزیدی سلطنت لرز گئی تھی

بھائی کا سر تھا آگے اور بہن تھی قید میں
صبر و رضا کی کیسی وہ انتہا چلی تھی

ثناگرؔ بیان کیسے ہو زینبؑ کا وہ وقار
جس کے جلال کے آگے دنیا ہی جھک گئی تھی`,
    genre: "نوحہ",
    genreSlug: "noha",
    occasion: "سفر اهل ِ حرم بازار و دربار ِ شام",
    reciter: "سجاد حسین سجاد (Sajjad Hussain Sajjad)",
    reciterSlug: "sajjad-hussain",
    youtubeUrl: "https://www.youtube.com/results?search_query=Zehra+Ki+Piyari+Zainab+Sajjad+Hussain+Sajjad",
    year: "2023",
    language: "Urdu",
    popular: true,
    views: "61K",
  },
  {
    id: "ghazal-sukhan-ki-abroo",
    titleUrdu: "سخن کی آبرو ٹھہری محبت اہل بیتؑ کی",
    titleRoman: "Sukhan Ki Aabroo Thehri Mohabbat Ahlulbayt Ki",
    firstVerse: "سخن کی آبرو ٹھہری محبت اہل بیتؑ کی\nیہی بنیاد ہے میری، عقیدت اہل بیتؑ کی",
    fullKalam: `سخن کی آبرو ٹھہری محبت اہل بیتؑ کی
یہی بنیاد ہے میری، عقیدت اہل بیتؑ کی

قلم کو روشنی بخشی انہی کے نامِ نامی نے
مری فکر و نظر پہ ہے عنایت اہل بیتؑ کی

جہانِ فانی کے جاہ و حشم سے بے نیازی ہے
ہمیں کافی ہے بس پیاری محبت اہل بیتؑ کی

قیامت کے اندھیروں میں چراغِ راہ بنے گی
میسر آئے گی جب بھی شفاعت اہل بیتؑ کی

ہزاروں حاسدوں کے درمیاں ثناگرؔ سنبھلتا ہے
ہے سر پر سائے کی صورت حفاظت اہل بیتؑ کی`,
    genre: "منقبت",
    genreSlug: "manqabat",
    occasion: "عزاداري",
    reciter: "ثناگر حسینی",
    reciterSlug: "sanagar-hussaini",
    youtubeUrl: "https://www.youtube.com/results?search_query=Sukhan+Ki+Aabroo+Sanagar+Hussaini",
    year: "2022",
    language: "Urdu",
    popular: false,
    views: "18K",
  }
];
