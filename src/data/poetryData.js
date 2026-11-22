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

// LIST 1: حمد، نعت، قصیدہ و منقبت مناسبات (حمد، نعت، اعیاد، جشن و شخصیات)
export const OCCASIONS_LIST_1 = [
  "حمد باري تعاليٰ",
  "نعت",
  "حضرت امام موسٰي ڪاظم عليه السلام",
  "عيد ِ زهرا سلام الله عليها - عيد ِ شجاع - تاج پوشي امام ِ زمانهٰ عليه السلام",
  "حضرت محمڊ مصطفيٰ صلي الله عليه و آله وسلم",
  "حضرت امام جعفر صادق عليه السلام",
  "حضرت بيبي امّ ِ ڪلثوم سلام الله عليها",
  "حضرت امام حسن عسڪري عليه السلام",
  "حضرت بيبي فاطمه زهرا سلام الله عليها",
  "حضرت امام محمد باقر عليه السلام",
  "حضرت امام علي نقي عليه السلام",
  "حضرت علي اصغر عليه السلام",
  "حضرت امام محمد تقي عليه السلام",
  "حضرت امام علي عليه السلام",
  "حضرت بيبي سڪينه سلام الله عليها",
  "نياز حضرت امام جعفر صادق عليه السلام (ڪونڊا)",
  "معراج",
  "آمد ِ شعبان",
  "حضرت زينب سلام الله عليها",
  "حضرت امام حسين عليه السلام",
  "حضرت عباس غازي علمدار عليه السلام",
  "حضرت امام زين العابدين عليه السلام",
  "حضرت قاسم ابن حسن عليه السلام",
  "حضرت علي اڪبر عليه السلام",
  "حضرت امام مهدي عليه السلام",
  "رمضان نعت",
  "حضرت امام حسن عليه السلام",
  "حضرت امام علي رضا عليه السلام",
  "عقد حضرت زهرا و امام علي عليه السلام",
  "سفر حج",
  "عيد ِ غدير - عليا والي الله",
  "عيد ِ مباهلا",
  "زواري",
  "دهمال شهباز قلندر",
  "نياز امام حسن",
  "ديگر عنوان"
];

// LIST 2: محرم الحرام، مصائب و شہادت (Aza & Mourning Occasions — Noha, Salam, Marsiya)
export const OCCASIONS_LIST_2 = [
  "آمد ِ  محرم",
  "حضرت عباس علمدار عليه السلام",
  "حضرت بيبي  فاطمه صغرا عليه السلام",
  "حضرت علي اڪبر  عليه السلام",
  "حضرت قاسم ابن حسن  عليه السلام",
  "حضرت علي اصغر  عليه السلام",
  "حضرت امام حسين عليه السلام",
  "شهداءِ ڪربلا ( 0ا محرم عاشور)",
  "شام ِ غريبان",
  "سفر اهل ِ حرم بازار و دربار ِ شام",
  "حضرت امام زين العابدين عليه السلام",
  "حضرت بيبي  فضه عليه السلام",
  "حضرت بيبي سڪينه  عليه السلام",
  "چهلم",
  "آمد ِ قافلا در مدينه",
  "حضرت امام حسن عسڪري  عليه السلام",
  "حضرت ابو طالب  عليه السلام",
  "حضرت بيبي  فاطمه زهرا  عليه السلام",
  "حضرت امام علي نقي عليه السلام",
  "حضرت امام موسٰي ڪاظم عليه السلام",
  "روانگي قافلا",
  "حضرت بيبي خديجهٰ  عليه السلام",
  "حضرت امام علي عليه السلام",
  "انهدام جنت البقيعه",
  "حضرت امام جعفر صادق عليه السلام",
  "حضرت امام علي رضا عليه السلام",
  "حضرت امام محمد تقي عليه السلام",
  "حضرت امام  محمد باقر عليه السلام",
  "روانگي قافلا 8 ذي الحج مڪه تا ڪربلا",
  "حضرت مسلم عليه السلام",
  "فرزندان ِ حضرت مسلم عليه السلام",
  "حضرت زينب عليه السلام",
  "عزاداري",
  "زواري"
];

/**
 * Returns the scoped occasion configuration for a given genre.
 * Supports custom dynamic lists saved by admin in localStorage.
 */
export function getOccasionsForGenre(genre, customList1 = OCCASIONS_LIST_1, customList2 = OCCASIONS_LIST_2) {
  const list1 = customList1 || OCCASIONS_LIST_1;
  const list2 = customList2 || OCCASIONS_LIST_2;

  if (genre === "حمد") {
    const hamdItems = list1.filter(item => item.includes("حمد"));
    return { 
      mode: "single", 
      allLabel: "حمد باري تعاليٰ", 
      list: hamdItems.length > 0 ? hamdItems : ["حمد باري تعاليٰ"],
      fullList: list1
    };
  }
  if (genre === "نعت") {
    const naatItems = list1.filter(item => item.includes("نعت") || item.includes("محمڊ") || item.includes("مصطفيٰ"));
    return { 
      mode: "single", 
      allLabel: "نعت", 
      list: naatItems.length > 0 ? naatItems : ["نعت", "رمضان نعت"],
      fullList: list1
    };
  }
  if (genre === "قصیدہ" || genre === "منقبت") {
    return {
      mode: "wiladat",
      allLabel: "تمام مناسبات (حمد، نعت، قصیدہ، منقبت)",
      list: list1,
      fullList: list1
    };
  }
  if (genre === "نوحہ" || genre === "سلام" || genre === "مرثیہ") {
    return {
      mode: "aza",
      allLabel: "تمام مناسباتِ عزاداری و شہادت (Aza & Mourning)",
      list: list2,
      fullList: list2
    };
  }
  return {
    mode: "all",
    allLabel: "تمام مناسبات (All Occasions)",
    list1: list1,
    list2: list2
  };
}

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
    occasion: "حضرت بيبي  فاطمه زهرا  عليه السلام",
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
    occasion: "ولادت حضرت امام علي عليه السلام",
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
    occasion: "حضرت بيبي  فاطمه زهرا  عليه السلام",
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
    occasion: "ولادت حضرت امام علي عليه السلام",
    reciter: "ثناگر حسینی",
    reciterSlug: "sanagar-hussaini",
    youtubeUrl: "https://www.youtube.com/results?search_query=Sukhan+Ki+Aabroo+Sanagar+Hussaini",
    year: "2022",
    language: "Urdu",
    popular: false,
    views: "18K",
  }
];
