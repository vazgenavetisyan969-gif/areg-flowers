import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Page,
  Header,
  Logo,
  Nav,
  Hero,
  HeroText,
  Title,
  Subtitle,
  Button,
  HeroCard,
  FlowerImg,
  Section,
  SmallSection,
  SectionTitle,
  Cards,
  AboutCards,
  Card,
  CardImg,
  CardTitle,
  CardText,
  Price,
  Footer,
  MoreBox,
  MoreControls,
  MoreButton,
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalForm,
  ModalInput,
  ModalSelect,
  ModalButtons,
  CloseButton,
  PlusButton,
  CartBox,
  CartHeader,
  CartLogo,
  CartButton,
  CartCount,
  CartItems,
  CartItem,
  CartActions,
  RoundActionButton,
  DeleteActionButton,
  SuccessBox,
} from "./styled.jsx";

const WEB3FORMS_ACCESS_KEY = "6e450ea3-482b-42bc-aefa-76e2cd4f3364";
const REAL_PAYMENT_GATEWAY_URL = import.meta.env.VITE_CARD_PAYMENT_URL || "";
const logo = "/areg-flowers-logo.png";

const COUNTRIES = [
  { code: "AM", name: "Հայաստան", flag: "🇦🇲", dial: "+374", minDigits: 8, maxDigits: 8, placeholder: "77123456" },
  { code: "RU", name: "Ռուսաստան", flag: "🇷🇺", dial: "+7", minDigits: 10, maxDigits: 10, placeholder: "9161234567" },
  { code: "US", name: "ԱՄՆ / Կանադա", flag: "🇺🇸", dial: "+1", minDigits: 10, maxDigits: 10, placeholder: "2025550123" },
  { code: "GE", name: "Վրաստան", flag: "🇬🇪", dial: "+995", minDigits: 9, maxDigits: 9, placeholder: "555123456" },
  { code: "FR", name: "Ֆրանսիա", flag: "🇫🇷", dial: "+33", minDigits: 9, maxDigits: 9, placeholder: "612345678" },
  { code: "DE", name: "Գերմանիա", flag: "🇩🇪", dial: "+49", minDigits: 10, maxDigits: 11, placeholder: "15123456789" },
  { code: "GB", name: "Մեծ Բրիտանիա", flag: "🇬🇧", dial: "+44", minDigits: 10, maxDigits: 10, placeholder: "7911123456" },
  { code: "AE", name: "ԱՄԷ", flag: "🇦🇪", dial: "+971", minDigits: 9, maxDigits: 9, placeholder: "501234567" },
  { code: "IR", name: "Իրան", flag: "🇮🇷", dial: "+98", minDigits: 10, maxDigits: 10, placeholder: "9123456789" },
];

const ABOUT_GALLERY_SLOTS = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  label: `Նկար ${index + 1}`,
  src: "",
}));

const products = [
  {
    id: "astromeria",
    img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    title: "Աստրոմերիա",
    text: "Նուրբ, գունավոր և երկար պահպանվող ծաղիկներ սիրելի մարդու համար։",
    price: "8,000 դրամ",
  },
  {
    id: "psakner",
    img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800",
    title: "Պսակներ",
    text: "Գեղեցիկ և խնամքով պատրաստված ծաղկային պսակներ տարբեր առիթների համար։",
    price: "35,000 դրամ",
  },
  {
    id: "caxkepnjer",
    img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800",
    title: "Ծաղկեփնջեր",
    text: "Թարմ և շքեղ ծաղկեփնջեր ծննդյան, սիրո և տոնական օրերի համար։",
    price: "12,000 դրամ",
  },
  {
    id: "varder",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800",
    title: "Վարդեր",
    text: "Կարմիր, սպիտակ և վարդագույն վարդեր՝ սիրո ամենագեղեցիկ նվերը։",
    price: "15,000 դրամ",
  },
];

const categoryItems = {
  astromeria: {
    title: "Աստրոմերիա",
    button: "Աստրոմերիա",
    items: Array.from({ length: 12 }, (_, index) => ({
      id: `astromeria-${index + 1}`,
      img: [
        "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800",
      ][index % 3],
      title: `Աստրոմերիա ${index + 1}`,
      text: "Թարմ աստրոմերիա՝ գեղեցիկ գույներով և նուրբ տեսքով։",
      price: `${8 + index},000 դրամ`,
    })),
  },

  psakner: {
    title: "Պսակներ",
    button: "Պսակներ",
    items: Array.from({ length: 12 }, (_, index) => ({
      id: `psak-${index + 1}`,
      img: [
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800",
        "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800",
        "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800",
      ][index % 3],
      title: `Ծաղկային պսակ ${index + 1}`,
      text: "Խնամքով պատրաստված պսակ՝ գեղեցիկ և նուրբ ձևավորմամբ։",
      price: `${35 + index * 2},000 դրամ`,
    })),
  },

  caxkepnjer: {
    title: "Ծաղկեփնջեր",
    button: "Ծաղկեփնջեր",
    items: Array.from({ length: 12 }, (_, index) => ({
      id: `bouquet-${index + 1}`,
      img: [
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800",
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800",
        "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800",
      ][index % 3],
      title: `Ծաղկեփունջ ${index + 1}`,
      text: "Թարմ ծաղիկներից պատրաստված շքեղ ծաղկեփունջ։",
      price: `${12 + index},000 դրամ`,
    })),
  },

  varder: {
    title: "Վարդեր",
    button: "Վարդեր",
    items: Array.from({ length: 12 }, (_, index) => ({
      id: `rose-${index + 1}`,
      img: [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800",
        "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800",
        "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?w=800",
      ][index % 3],
      title: `Վարդեր ${index + 1}`,
      text: "Գեղեցիկ վարդեր՝ սիրելի մարդուն նվիրելու համար։",
      price: `${15 + index},000 դրամ`,
    })),
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function getPriceNumber(price) {
  return Number(String(price).replace(/,/g, "").replace(" դրամ", ""));
}

function formatCardNumber(raw) {
  const digits = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw) {
  const digits = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isValidLuhnCard(cardDigits) {
  if (cardDigits.length !== 16) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardDigits.length - 1; i >= 0; i--) {
    let digit = parseInt(cardDigits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function getEffectiveMaxDigits(country, isMobile) {
  return isMobile ? Math.min(country.maxDigits, 8) : country.maxDigits;
}

function validatePhoneByCountry(countryCode, digits, isMobile = false) {
  const country =
    COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
  const effectiveMax = getEffectiveMaxDigits(country, isMobile);
  const effectiveMin = Math.min(country.minDigits, effectiveMax);
  const cleanDigits = String(digits || "").replace(/\D/g, "");

  if (cleanDigits.length < effectiveMin || cleanDigits.length > effectiveMax) {
    const countText =
      effectiveMin === effectiveMax
        ? `${effectiveMax}`
        : `${effectiveMin}-${effectiveMax}`;
    return `Հեռախոսահամարը պետք է լինի խիստ ${countText} նիշ։`;
  }
  return "";
}

function splitPhoneWithCountry(rawPhone) {
  const cleaned = String(rawPhone || "").replace(/[^\d+]/g, "");
  if (!cleaned) {
    return { country: COUNTRIES[0], digits: "" };
  }

  const sortedByDialLength = [...COUNTRIES].sort(
    (a, b) => b.dial.length - a.dial.length
  );

  for (const country of sortedByDialLength) {
    if (cleaned.startsWith(country.dial)) {
      return {
        country,
        digits: cleaned
          .slice(country.dial.length)
          .replace(/\D/g, "")
          .slice(0, country.maxDigits),
      };
    }
  }

  const onlyDigits = cleaned.replace(/\D/g, "");
  if (onlyDigits.startsWith("0") && onlyDigits.length === 9) {
    return { country: COUNTRIES[0], digits: onlyDigits.slice(1, 9) };
  }

  return {
    country: COUNTRIES[0],
    digits: onlyDigits.slice(0, COUNTRIES[0].maxDigits),
  };
}

function PhoneInputWithFlag({
  countryCode,
  onCountryChange,
  digits,
  onDigitsChange,
  isMobile = false,
  required = false,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedCountry =
    COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
  const maxAllowedDigits = getEffectiveMaxDigits(selectedCountry, isMobile);

  useEffect(() => {
    if (digits.length > maxAllowedDigits) {
      onDigitsChange(digits.slice(0, maxAllowedDigits));
    }
  }, [maxAllowedDigits, digits, onDigitsChange]);

  const handleDigitsInput = (e) => {
    const numericOnly = e.target.value
      .replace(/\D/g, "")
      .slice(0, maxAllowedDigits);
    onDigitsChange(numericOnly);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1.5px solid #f3c6d8",
          borderRadius: "999px",
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(213, 63, 140, 0.08)",
        }}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "11px 14px",
            border: "none",
            borderRight: "1px solid #fed7e2",
            background: "linear-gradient(135deg, #fff5f7 0%, #fed7e2 100%)",
            cursor: "pointer",
            fontSize: "13.5px",
            fontWeight: 700,
            color: "#97266d",
            whiteSpace: "nowrap",
            minHeight: "46px",
          }}
        >
          <span style={{ fontSize: "17px" }}>{selectedCountry.flag}</span>
          <span>{selectedCountry.dial}</span>
          <span style={{ fontSize: "10px", color: "#97266d" }}>▼</span>
        </button>

        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxAllowedDigits}
          placeholder={`${selectedCountry.placeholder.slice(
            0,
            maxAllowedDigits
          )} (${maxAllowedDigits} թիվ)`}
          value={digits.slice(0, maxAllowedDigits)}
          onChange={handleDigitsInput}
          required={required}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "11px 10px",
            fontSize: "15px",
            color: "#1a202c",
            width: "100%",
            minHeight: "46px",
            background: "#fff",
          }}
        />

        <span
          style={{
            paddingRight: "14px",
            fontSize: "11px",
            fontWeight: 700,
            color:
              digits.length === maxAllowedDigits ? "#2f855a" : "#a0aec0",
            whiteSpace: "nowrap",
          }}
        >
          {Math.min(digits.length, maxAllowedDigits)}/{maxAllowedDigits}
        </span>
      </div>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "108%",
            left: 0,
            right: 0,
            maxHeight: "220px",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #fed7e2",
            borderRadius: "24px",
            boxShadow: "0 14px 30px rgba(151, 38, 109, 0.16)",
            zIndex: 80,
            padding: "6px",
          }}
        >
          {COUNTRIES.map((country) => {
            const countryMax = getEffectiveMaxDigits(country, isMobile);
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onCountryChange(country.code);
                  onDigitsChange(digits.slice(0, countryMax));
                  setDropdownOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "999px",
                  background:
                    country.code === selectedCountry.code ? "#fff5f7" : "#fff",
                  cursor: "pointer",
                  fontSize: "13.5px",
                  textAlign: "left",
                  minHeight: "42px",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "17px" }}>{country.flag}</span>
                  <span style={{ color: "#2d3748" }}>{country.name}</span>
                </span>
                <span style={{ fontWeight: 700, color: "#d53f8c" }}>
                  {country.dial} ({countryMax} նիշ)
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getCartStorageKey(userId) {
  return `areg_flowers_cart_${userId || "guest"}`;
}

function readCartFromStorage(userId) {
  try {
    const raw = localStorage.getItem(getCartStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartToStorage(userId, items) {
  try {
    localStorage.setItem(getCartStorageKey(userId), JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

function FlowerShop() {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cardPaymentOpen, setCardPaymentOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cart, setCart] = useState(() => readCartFromStorage(null));
  const [selectedCartIds, setSelectedCartIds] = useState(() =>
    readCartFromStorage(null).map((item) => item.id)
  );

  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Ավելացվեց զամբյուղ ✅");
  const [loading, setLoading] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState("email");
  const [authMode, setAuthMode] = useState("login");
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState({
    fullName: "",
    email: "",
    password: "",
    countryCode: "AM",
    phoneDigits: "",
    otp: "",
  });

  const [form, setForm] = useState({
    name: "",
    countryCode: "AM",
    phoneDigits: "",
    address: "",
    payment: "cash",
  });

  const [cardForm, setCardForm] = useState({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const showToast = (msg, duration = 3500) => {
    setSuccessText(msg);
    setSuccess(true);
    setTimeout(() => setSuccess(false), duration);
  };

  const getFullPhone = (countryCode, digits) => {
    const country =
      COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
    const maxAllowed = getEffectiveMaxDigits(country, isMobile);
    const cleanDigits = String(digits || "")
      .replace(/\D/g, "")
      .slice(0, maxAllowed);
    if (!cleanDigits) return "";
    return `${country.dial}${cleanDigits}`;
  };

  const syncUserSession = (currentUser) => {
    const guestItems = readCartFromStorage(null);
    const nextItems = readCartFromStorage(currentUser?.id);

    if (currentUser && nextItems.length === 0 && guestItems.length > 0) {
      writeCartToStorage(currentUser.id, guestItems);
      setCart(guestItems);
      setSelectedCartIds(guestItems.map((i) => i.id));
    } else {
      setCart(nextItems);
      setSelectedCartIds(nextItems.map((i) => i.id));
    }

    setUser(currentUser);
    setAuthReady(true);

    if (currentUser) {
      const metaName =
        currentUser.user_metadata?.full_name ||
        currentUser.user_metadata?.name ||
        "";
      const rawPhone =
        currentUser.phone || currentUser.user_metadata?.phone || "";
      const parsedPhone = splitPhoneWithCountry(rawPhone);

      setForm((prev) => ({
        ...prev,
        name: prev.name || metaName,
        countryCode: prev.phoneDigits
          ? prev.countryCode
          : parsedPhone.country.code,
        phoneDigits: prev.phoneDigits || parsedPhone.digits,
      }));
    } else {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      syncUserSession(data?.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        syncUserSession(session?.user || null);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;
    writeCartToStorage(user?.id, cart);
    setSelectedCartIds((prev) =>
      prev.filter((id) => cart.some((item) => item.id === id))
    );
  }, [cart, user?.id, authReady]);

  const handleGoogleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
      }
    } catch {
      setAuthError("Google-ով մուտքի սխալ տեղի ունեցավ։");
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const emailClean = authForm.email.trim();
      const nameClean = authForm.fullName.trim();

      if (!emailClean || !authForm.password) {
        setAuthError("Լրացրեք Gmail/Email-ը և գաղտնաբառը։");
        return;
      }

      if (authMode === "register" && authForm.phoneDigits) {
        const phoneErr = validatePhoneByCountry(
          authForm.countryCode,
          authForm.phoneDigits,
          isMobile
        );
        if (phoneErr) {
          setAuthError(phoneErr);
          return;
        }
      }

      const fullPhone = getFullPhone(
        authForm.countryCode,
        authForm.phoneDigits
      );

      if (authMode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: emailClean,
          password: authForm.password,
          options: {
            data: {
              full_name: nameClean,
              phone: fullPhone,
            },
          },
        });

        if (error) {
          setAuthError(error.message);
          return;
        }

        if (data?.user) {
          setForm((prev) => ({
            ...prev,
            name: nameClean || prev.name,
            countryCode: authForm.phoneDigits
              ? authForm.countryCode
              : prev.countryCode,
            phoneDigits: authForm.phoneDigits || prev.phoneDigits,
          }));
        }

        setAuthOpen(false);
        showToast("Գրանցումը հաջողվեց ✅");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailClean,
          password: authForm.password,
        });

        if (error) {
          setAuthError(error.message);
          return;
        }

        if (nameClean && data?.user) {
          await supabase.auth.updateUser({
            data: { full_name: nameClean },
          });
        }

        const userPhone = splitPhoneWithCountry(
          data?.user?.user_metadata?.phone || data?.user?.phone || ""
        );

        setForm((prev) => ({
          ...prev,
          name:
            nameClean ||
            prev.name ||
            data?.user?.user_metadata?.full_name ||
            "",
          countryCode: prev.phoneDigits
            ? prev.countryCode
            : userPhone.country.code,
          phoneDigits: prev.phoneDigits || userPhone.digits,
        }));

        setAuthOpen(false);
        showToast("Մուտքը հաջողվեց ✅");
      }
    } catch {
      setAuthError("Սխալ տեղի ունեցավ մուտքի/գրանցման ժամանակ։");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const phoneErr = validatePhoneByCountry(
        authForm.countryCode,
        authForm.phoneDigits,
        isMobile
      );
      if (phoneErr) {
        setAuthError(phoneErr);
        return;
      }

      const formattedPhone = getFullPhone(
        authForm.countryCode,
        authForm.phoneDigits
      );

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          data: {
            full_name: authForm.fullName.trim(),
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      setOtpSent(true);
      showToast("SMS կոդն ուղարկվեց 📩");
    } catch {
      setAuthError("Չհաջողվեց ուղարկել SMS կոդը։");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const formattedPhone = getFullPhone(
        authForm.countryCode,
        authForm.phoneDigits
      );
      const tokenClean = authForm.otp.trim();

      if (!tokenClean) {
        setAuthError("Մուտքագրեք SMS-ով ստացված կոդը։");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: tokenClean,
        type: "sms",
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (authForm.fullName.trim()) {
        await supabase.auth.updateUser({
          data: { full_name: authForm.fullName.trim() },
        });
      }

      setForm((prev) => ({
        ...prev,
        name: authForm.fullName.trim() || prev.name,
        countryCode: authForm.countryCode,
        phoneDigits: authForm.phoneDigits,
      }));

      setAuthOpen(false);
      setOtpSent(false);
      setAuthForm((prev) => ({ ...prev, otp: "" }));
      showToast("Մուտքը հեռախոսահամարով հաջողվեց ✅");
    } catch {
      setAuthError("Կոդի ստուգման սխալ։");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    setUser(null);
    const guestCart = readCartFromStorage(null);
    setCart(guestCart);
    setSelectedCartIds(guestCart.map((i) => i.id));
    showToast("Դուրս եկաք հաշվից");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      const nextCart = existing
        ? prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...item, quantity: 1 }];

      writeCartToStorage(user?.id, nextCart);
      return nextCart;
    });

    setSelectedCartIds((prev) =>
      prev.includes(item.id) ? prev : [...prev, item.id]
    );

    showToast("Ավելացվեց զամբյուղ ✅", 1500);
  };

  const minusFromCart = (id) => {
    setCart((prev) => {
      const nextCart = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      writeCartToStorage(user?.id, nextCart);
      return nextCart;
    });
  };

  const deleteFromCart = (id) => {
    setCart((prev) => {
      const nextCart = prev.filter((item) => item.id !== id);
      writeCartToStorage(user?.id, nextCart);
      return nextCart;
    });
    setSelectedCartIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleSelectCartItem = (id) => {
    setSelectedCartIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAllCart = () => {
    if (selectedCartIds.length === cart.length) {
      setSelectedCartIds([]);
    } else {
      setSelectedCartIds(cart.map((item) => item.id));
    }
  };

  const deleteSelectedFromCart = () => {
    if (selectedCartIds.length === 0) {
      showToast("Նախ նշեք ապրանքները", 2000);
      return;
    }
    const removedCount = selectedCartIds.length;
    setCart((prev) => {
      const nextCart = prev.filter(
        (item) => !selectedCartIds.includes(item.id)
      );
      writeCartToStorage(user?.id, nextCart);
      return nextCart;
    });
    setSelectedCartIds([]);
    showToast(`Ջնջվեց ${removedCount} նշված ապրանք 🗑️`, 2200);
  };

  const selectedItems = cart.filter((item) =>
    selectedCartIds.includes(item.id)
  );

  const cartProductsCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const selectedQuantityCount = selectedItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const totalPrice = selectedItems.reduce(
    (total, item) => total + getPriceNumber(item.price) * item.quantity,
    0
  );

  const finalizeOrder = async (cardDetails = null) => {
    setLoading(true);

    const itemsToOrder = selectedItems.length > 0 ? selectedItems : cart;
    const orderTotal = itemsToOrder.reduce(
      (sum, item) => sum + getPriceNumber(item.price) * item.quantity,
      0
    );
    const fullOrderPhone = getFullPhone(form.countryCode, form.phoneDigits);

    const productsText = itemsToOrder
      .map((item, index) => {
        const itemTotal = getPriceNumber(item.price) * item.quantity;
        return `
${index + 1}. ${item.title}
Գին: ${item.price}
Քանակ: ${item.quantity}
Ընդհանուր: ${itemTotal} դրամ
-------------------------
`;
      })
      .join("\n");

    const userAccountInfo = user
      ? `Հաշիվ: ${user.email || user.phone || user.id}`
      : "Հաշիվ: Հյուր (առանց մուտքի)";

    const maskedCard = cardDetails
      ? `Քարտային վճարում փոխանցված՝ Քարտապան՝ ${
          cardDetails.holderName
        }, Քարտ՝ •••• •••• •••• ${cardDetails.cardNumber
          .replace(/\D/g, "")
          .slice(-4)}, Ժամկետ՝ ${cardDetails.expiry}, Գումար՝ ${orderTotal} դրամ`
      : "";

    const orderMessage = `
🌸 Նոր պատվեր Areg flowers կայքից

Հաճախորդի տվյալներ
Անուն: ${form.name}
Հեռախոս: ${fullOrderPhone}
Հասցե: ${form.address}
${userAccountInfo}

Վճարում
${form.payment === "cash" ? "Վճարում առաքման պահին" : "Քարտով վճարում"}
${maskedCard}

Պատվերներ (${itemsToOrder.length} տեսակ)
${productsText}

Ընդհանուր գումար: ${orderTotal} դրամ
`;

    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "🌸 Նոր պատվեր Areg flowers կայքից",
      from_name: "Areg flowers",
      name: form.name,
      phone: fullOrderPhone,
      address: form.address,
      account: userAccountInfo,
      payment:
        form.payment === "cash"
          ? "Վճարում առաքման պահին"
          : "Քարտով վճարում",
      card_info: maskedCard,
      products: productsText,
      totalPrice: `${orderTotal} դրամ`,
      message: orderMessage,
      botcheck: "",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Պատվերը չուղարկվեց ❌", 3500);
        return;
      }

      const orderedIds = new Set(itemsToOrder.map((i) => i.id));
      const remainingCart = cart.filter((item) => !orderedIds.has(item.id));

      setOrderOpen(false);
      setCardPaymentOpen(false);
      setCartOpen(false);
      setCart(remainingCart);
      setSelectedCartIds(remainingCart.map((i) => i.id));
      writeCartToStorage(user?.id, remainingCart);

      setCardForm({
        holderName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });

      const parsedUserPhone = splitPhoneWithCountry(
        user?.phone || user?.user_metadata?.phone || ""
      );
      setForm({
        name:
          user?.user_metadata?.full_name ||
          user?.user_metadata?.name ||
          "",
        countryCode: parsedUserPhone.country.code,
        phoneDigits: parsedUserPhone.digits,
        address: "",
        payment: "cash",
      });

      showToast("Պատվերը հաջողությամբ ստացվեց", 4000);
    } catch (error) {
      console.log("WEB3FORMS FETCH ERROR:", error);
      showToast("Կապի սխալ ❌ Ստուգեք ինտերնետը", 3500);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      showToast("Նշեք առնվազն 1 ապրանք զամբյուղում", 2500);
      return;
    }

    if (!form.name.trim() || !form.address.trim() || !form.payment) {
      showToast("Լրացրեք բոլոր դաշտերը", 2500);
      return;
    }

    const phoneErr = validatePhoneByCountry(
      form.countryCode,
      form.phoneDigits,
      isMobile
    );
    if (phoneErr) {
      showToast(phoneErr, 3500);
      return;
    }

    if (form.payment === "card") {
      if (REAL_PAYMENT_GATEWAY_URL) {
        window.open(REAL_PAYMENT_GATEWAY_URL, "_blank", "noopener,noreferrer");
      }
      setCardForm((prev) => ({
        ...prev,
        holderName: prev.holderName || form.name,
      }));
      setOrderOpen(false);
      setCardPaymentOpen(true);
      return;
    }

    await finalizeOrder(null);
  };

  const handleCardPaymentSubmit = async (e) => {
    e.preventDefault();
    const rawCardDigits = cardForm.cardNumber.replace(/\D/g, "");
    const rawExpiryDigits = cardForm.expiry.replace(/\D/g, "");
    const rawCvvDigits = cardForm.cvv.replace(/\D/g, "");

    if (!cardForm.holderName.trim()) {
      showToast("Լրացրեք քարտապանի անունը", 2500);
      return;
    }
    if (rawCardDigits.length !== 16 || !isValidLuhnCard(rawCardDigits)) {
      showToast("Քարտի համարը սխալ է (ստուգեք 16 թվերը)", 3500);
      return;
    }
    const expMonth = Number(rawExpiryDigits.slice(0, 2));
    if (rawExpiryDigits.length !== 4 || expMonth < 1 || expMonth > 12) {
      showToast("Սխալ ժամկետ (MM/YY)", 3000);
      return;
    }
    if (rawCvvDigits.length < 3 || rawCvvDigits.length > 4) {
      showToast("CVV կոդը պետք է լինի 3 կամ 4 թիվ", 3000);
      return;
    }

    await finalizeOrder(cardForm);
  };

  const emailUsername = user?.email ? user.email.split("@")[0] : "";
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    emailUsername ||
    user?.phone ||
    "Հաշիվ";
  const userAvatar =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";
  const userInitial = (userName || user?.email || "A")
    .trim()
    .charAt(0)
    .toUpperCase();

  const navigateToSection = (page, hashId) => {
    setActivePage(page);
    if (hashId) {
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Page
      style={{
        background:
          "linear-gradient(180deg, #fff9fb 0%, #ffffff 35%, #fff5f8 100%)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.92)",
          borderBottom: "1px solid #fed7e2",
          padding: isMobile ? "10px 14px" : "14px 28px",
          flexWrap: "wrap",
          gap: isMobile ? "8px" : "16px",
        }}
      >
        <Logo
          onClick={() => navigateToSection("home", null)}
          style={{
            cursor: "pointer",
            fontSize: isMobile ? "17px" : "20px",
          }}
        >
          <img
            src={logo}
            alt="Areg flowers"
            style={{
              width: isMobile ? "34px" : "42px",
              height: isMobile ? "34px" : "42px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: 800, color: "#97266d" }}>
            Areg flowers
          </span>
        </Logo>

        <Nav
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: isMobile ? "8px" : "18px",
            fontSize: isMobile ? "12.5px" : "14px",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "10px" : "18px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("home", "home");
              }}
            >
              Գլխավոր
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("home", "products");
              }}
            >
              Ծաղիկներ
            </a>
            <a
              href="#about-page"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("about", null);
              }}
              style={
                activePage === "about"
                  ? { color: "#d53f8c", fontWeight: 700 }
                  : undefined
              }
            >
              Մեր մասին
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Կապ
            </a>
          </div>

          {user ? (
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: isMobile ? "5px 10px 5px 5px" : "6px 13px 6px 6px",
                borderRadius: "999px",
                border: "1.5px solid #f687b3",
                background: "linear-gradient(135deg, #fff5f7 0%, #fed7e2 100%)",
                color: "#97266d",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(213, 63, 140, 0.14)",
              }}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #d53f8c 0%, #97266d 100%)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {userInitial}
                </span>
              )}
              <span>{userName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setAuthError("");
                setAuthOpen(true);
              }}
              style={{
                padding: isMobile ? "7px 13px" : "8px 16px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(135deg, #e53e8d 0%, #b83280 100%)",
                color: "#fff",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: 700,
                boxShadow: "0 6px 16px rgba(213, 63, 140, 0.28)",
              }}
            >
              Մուտք / Գրանցում
            </button>
          )}
        </Nav>
      </Header>

      {activePage === "about" ? (
        <Section
          id="about-page"
          style={{
            paddingTop: isMobile ? "20px" : "36px",
            paddingLeft: isMobile ? "14px" : "24px",
            paddingRight: isMobile ? "14px" : "24px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ marginBottom: "18px" }}>
              <Button
                type="button"
                $small
                onClick={() => navigateToSection("home", null)}
                style={{
                  borderRadius: "999px",
                  padding: "9px 16px",
                }}
              >
                ← Վերադառնալ գլխավոր էջ
              </Button>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, #fff0f6 0%, #fff9fb 60%, #ffe3ec 100%)",
                border: "1px solid #fbb6ce",
                borderRadius: isMobile ? "22px" : "28px",
                padding: isMobile ? "20px 16px" : "32px",
                marginBottom: "28px",
                lineHeight: 1.8,
                color: "#2d3748",
                fontSize: isMobile ? "14.5px" : "16px",
                boxShadow: "0 14px 34px rgba(213, 63, 140, 0.08)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#b83280",
                  border: "1px solid #f687b3",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                🌸 AREG FLOWERS • ՄԵՐ ՊԱՏՄՈՒԹՅՈՒՆԸ
              </div>

              <h2
                style={{
                  color: "#97266d",
                  fontSize: isMobile ? "21px" : "26px",
                  marginBottom: "12px",
                  lineHeight: 1.35,
                }}
              >
                Ծաղիկներ՝ անմիջապես ջերմոցից, յուրաքանչյուր զգացմունքի համար
              </h2>

              <p style={{ marginBottom: "14px" }}>
                <strong>Areg flowers</strong> ծաղկի սրահը ստեղծվել է մեկ պարզ ու
                ազնիվ նպատակով՝ մարդկանց նվիրել ամենաթարմ, ամենակենդանի և
                ամենաբուրավետ ծաղիկները։ Մեր ծաղիկները չեն անցնում օրեր շարունակ
                ձգվող պահեստային ճանապարհներով. դրանք գալիս են{" "}
                <strong>ուղիղ ջերմոցից</strong>՝ պահպանելով իրենց բնական
                փայլը, ամուր ցողուններն ու թարմությունը։
              </p>

              <p style={{ marginBottom: "14px" }}>
                Մեր նրբագեղ վարդերը, գունագեղ աստրոմերիաները, շքեղ
                ծաղկեփնջերն ու խնամքով հյուսված պսակները ստեղծված են այնպես, որ
                առաջին իսկ հայացքից հմայեն։ Երբ ծաղիկը թարմ է ու սիրով
                պատրաստված, այն դառնում է ոչ միայն գեղեցիկ նվեր, այլև ջերմ
                խոսք՝ առանց ավելորդ բառերի։
              </p>

              <p style={{ marginBottom: 0 }}>
                Անկախ նրանից՝ նշում եք ծննդյան օր, սիրո տարեդարձ, տոնական
                հանդիսություն, թե ցանկանում եք հարգանքի ու հիշատակի խորը տուրք
                մատուցել, <strong>Areg flowers</strong>-ը կանգնած է ձեր կողքին՝
                բարձր որակով, ճաշակով և հոգատարությամբ։
              </p>
            </div>

            <SectionTitle style={{ fontSize: isMobile ? "22px" : "28px" }}>
              Մեր թիմը
            </SectionTitle>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(3, minmax(0, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #fed7e2",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 10px 24px rgba(151, 38, 109, 0.06)",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌿</div>
                <h3
                  style={{
                    color: "#1a202c",
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Ավետիսյան Վազգեն
                </h3>
                <p
                  style={{
                    color: "#d53f8c",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    marginBottom: "10px",
                  }}
                >
                  Կայքի և նախագծի հիմնադիր
                </p>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Areg flowers-ի հիմնադիրը, ով ստեղծել է կայքը՝ ծաղկային
                  պատվերներն առավել պարզ, արագ ու վստահելի դարձնելու համար։
                </p>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #fed7e2",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 10px 24px rgba(151, 38, 109, 0.06)",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌱</div>
                <h3
                  style={{
                    color: "#1a202c",
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Ավետիսյան Գարուշ
                </h3>
                <p
                  style={{
                    color: "#d53f8c",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    marginBottom: "10px",
                  }}
                >
                  Ծաղիկների մատակարար (ուղիղ ջերմոցից)
                </p>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Ապահովում է ամենաթարմ ծաղիկների անմիջական մատակարարումը ուղիղ
                  ջերմոցից՝ երաշխավորելով բարձր որակ և երկար կյանք ծաղկամանում։
                </p>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #fed7e2",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 10px 24px rgba(151, 38, 109, 0.06)",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>💐</div>
                <h3
                  style={{
                    color: "#1a202c",
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Սաթենիկ Հովսեփյան
                </h3>
                <p
                  style={{
                    color: "#d53f8c",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    marginBottom: "10px",
                  }}
                >
                  Պսակներ և ծաղկեփնջեր պատրաստող մասնագետ
                </p>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Նուրբ ճաշակով ու ձեռքի վարպետությամբ ձևավորում է շքեղ
                  ծաղկեփնջեր և խնամքով պատրաստված պսակներ։
                </p>
              </div>
            </div>

            <SectionTitle style={{ fontSize: isMobile ? "21px" : "26px" }}>
              Մեր ծաղիկների և աշխատանքների սրահ (10 նկար)
            </SectionTitle>
            <p
              style={{
                textAlign: "center",
                color: "#718096",
                fontSize: isMobile ? "13.5px" : "14.5px",
                marginBottom: "20px",
              }}
            >
              10 բաց թողնված նկարի տեղ՝ ձեր ապագա լուսանկարների համար
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(5, minmax(0, 1fr))",
                gap: isMobile ? "12px" : "16px",
                marginBottom: "24px",
              }}
            >
              {ABOUT_GALLERY_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  style={{
                    height: isMobile ? "155px" : "195px",
                    borderRadius: "18px",
                    border: "2px dashed #f687b3",
                    background:
                      "linear-gradient(180deg, #fff8fb 0%, #fff0f6 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {slot.src ? (
                    <img
                      src={slot.src}
                      alt={slot.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "14px",
                      }}
                    />
                  ) : (
                    <>
                      <span
                        style={{
                          fontSize: isMobile ? "24px" : "28px",
                          marginBottom: "6px",
                        }}
                      >
                        🖼️
                      </span>
                      <strong
                        style={{
                          color: "#97266d",
                          fontSize: "13px",
                          marginBottom: "2px",
                        }}
                      >
                        Նկար #{slot.id}
                      </strong>
                      <span style={{ fontSize: "11px", color: "#718096" }}>
                        Դատարկ տեղ նկարի համար
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : (
        <>
          <Hero
            id="home"
            style={{
              flexDirection: isMobile ? "column-reverse" : "row",
              padding: isMobile ? "22px 16px 28px" : "48px 28px",
              gap: isMobile ? "20px" : "36px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <HeroText style={{ maxWidth: isMobile ? "100%" : "560px" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "#fff0f6",
                  color: "#b83280",
                  border: "1px solid #fbb6ce",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                🌸 Ուղիղ ջերմոցից • Թարմ ու բուրավետ
              </div>

              <Title
                style={{
                  fontSize: isMobile ? "27px" : "42px",
                  lineHeight: 1.22,
                  marginBottom: "12px",
                }}
              >
                Ծաղիկներ, որոնք խոսում են ձեր փոխարեն
              </Title>

              <Subtitle
                style={{
                  fontSize: isMobile ? "14.5px" : "17px",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                Areg flowers-ում կգտնես գեղեցիկ ծաղկեփնջեր, վարդեր, աստրոմերիա և
                պսակներ՝ անմիջապես ջերմոցից՝ յուրաքանչյուր առիթի համար։
              </Subtitle>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <Button
                  onClick={() => setCartOpen(true)}
                  style={{
                    borderRadius: "999px",
                    padding: isMobile ? "11px 20px" : "12px 24px",
                    boxShadow: "0 8px 20px rgba(213, 63, 140, 0.25)",
                  }}
                >
                  Բացել զամբյուղը
                </Button>
                <Button
                  type="button"
                  onClick={() => navigateToSection("about", null)}
                  style={{
                    borderRadius: "999px",
                    padding: isMobile ? "11px 18px" : "12px 22px",
                    background: "#fff",
                    color: "#97266d",
                    border: "1.5px solid #f687b3",
                  }}
                >
                  Մեր մասին
                </Button>
              </div>
            </HeroText>

            <HeroCard
              style={{
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? "270px" : "380px",
                borderRadius: "26px",
                padding: "14px",
                boxShadow: "0 16px 36px rgba(213, 63, 140, 0.14)",
              }}
            >
              <FlowerImg
                src={logo}
                alt="Areg flowers"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  display: "block",
                }}
              />
            </HeroCard>
          </Hero>

          <Section
            id="products"
            style={{
              padding: isMobile ? "24px 14px" : "44px 28px",
            }}
          >
            <SectionTitle style={{ fontSize: isMobile ? "22px" : "30px" }}>
              Մեր ծաղիկները
            </SectionTitle>

            <Cards
              style={{
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(4, minmax(0, 1fr))",
                gap: isMobile ? "16px" : "22px",
              }}
            >
              {products.map((item) => (
                <Card
                  key={item.id}
                  style={{
                    borderRadius: "22px",
                    border: "1px solid #fed7e2",
                    boxShadow: "0 10px 24px rgba(151, 38, 109, 0.06)",
                  }}
                >
                  <PlusButton onClick={() => addToCart(item)}>+</PlusButton>

                  <CardImg
                    src={item.img}
                    alt={item.title}
                    style={{
                      height: isMobile ? "190px" : "200px",
                      borderRadius: "16px",
                      objectFit: "cover",
                    }}
                  />
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.text}</CardText>
                  <Price>{item.price}</Price>

                  <Button
                    onClick={() => addToCart(item)}
                    $small
                    style={{
                      borderRadius: "999px",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Ավելացնել զամբյուղ
                  </Button>
                </Card>
              ))}
            </Cards>

            <MoreControls
              style={{
                borderRadius: "22px",
                padding: isMobile ? "20px 14px" : "28px",
              }}
            >
              <h3>Տեսնել բաժինները</h3>
              <p>Ընտրիր ծաղկի տեսակը և բացիր ապրանքները</p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {Object.entries(categoryItems).map(([key, category]) => (
                  <MoreButton
                    key={key}
                    type="button"
                    $active={activeCategory === key}
                    onClick={() =>
                      setActiveCategory(activeCategory === key ? null : key)
                    }
                    style={{ borderRadius: "999px" }}
                  >
                    {category.button}
                  </MoreButton>
                ))}
              </div>
            </MoreControls>

            {activeCategory && (
              <MoreBox>
                <SectionTitle>
                  {categoryItems[activeCategory].title}
                </SectionTitle>

                <Cards
                  style={{
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(4, minmax(0, 1fr))",
                    gap: isMobile ? "14px" : "20px",
                  }}
                >
                  {categoryItems[activeCategory].items.map((item) => (
                    <Card
                      key={item.id}
                      style={{
                        borderRadius: "20px",
                        border: "1px solid #fed7e2",
                      }}
                    >
                      <PlusButton onClick={() => addToCart(item)}>+</PlusButton>

                      <CardImg
                        src={item.img}
                        alt={item.title}
                        style={{
                          height: isMobile ? "180px" : "190px",
                          borderRadius: "14px",
                          objectFit: "cover",
                        }}
                      />
                      <CardTitle>{item.title}</CardTitle>
                      <CardText>{item.text}</CardText>
                      <Price>{item.price}</Price>

                      <Button
                        $small
                        onClick={() => addToCart(item)}
                        style={{
                          borderRadius: "999px",
                          width: isMobile ? "100%" : "auto",
                        }}
                      >
                        Ավելացնել զամբյուղ
                      </Button>
                    </Card>
                  ))}
                </Cards>
              </MoreBox>
            )}
          </Section>

          <SmallSection
            id="about"
            style={{
              padding: isMobile ? "24px 14px 36px" : "40px 28px",
            }}
          >
            <SectionTitle style={{ fontSize: isMobile ? "22px" : "28px" }}>
              Ինչու ընտրել մեզ
            </SectionTitle>

            <AboutCards
              style={{
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(3, minmax(0, 1fr))",
                gap: "16px",
              }}
            >
              <Card
                style={{
                  borderRadius: "20px",
                  border: "1px solid #fed7e2",
                }}
              >
                <CardTitle>Թարմ ծաղիկներ ուղիղ ջերմոցից</CardTitle>
                <CardText>
                  Ընտրում ենք գեղեցիկ և թարմ ծաղիկներ ուղիղ ջերմոցից ամեն պատվերի
                  համար։
                </CardText>
              </Card>

              <Card
                style={{
                  borderRadius: "20px",
                  border: "1px solid #fed7e2",
                }}
              >
                <CardTitle>Գեղեցիկ փաթեթավորում</CardTitle>
                <CardText>
                  Յուրաքանչյուր ծաղկեփունջ և պսակ պատրաստվում է մեծ խնամքով։
                </CardText>
              </Card>

              <Card
                style={{
                  borderRadius: "20px",
                  border: "1px solid #fed7e2",
                }}
              >
                <CardTitle>Արագ առաքում</CardTitle>
                <CardText>
                  Առաքում Երևանում և մարզերում՝ հարմար պայմաններով։
                </CardText>
              </Card>
            </AboutCards>

            <div style={{ textAlign: "center", marginTop: "22px" }}>
              <Button
                type="button"
                $small
                onClick={() => navigateToSection("about", null)}
                style={{
                  borderRadius: "999px",
                  padding: "10px 20px",
                }}
              >
                Ավելին մեր մասին →
              </Button>
            </div>
          </SmallSection>
        </>
      )}

      <Footer
        id="contact"
        style={{
          padding: isMobile ? "26px 16px 88px" : "36px 28px",
          textAlign: "center",
        }}
      >
        <h2>Areg flowers</h2>
        <p>
          Ծաղիկներ, որոնք խոսում են ձեր փոխարեն՝ ծաղկեփնջեր, վարդեր, պսակներ և
          աստրոմերիա
        </p>
        <p>Հեռ․ +374 77 88 44 67</p>
      </Footer>

      <CartButton
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed",
          right: isMobile ? "16px" : "24px",
          bottom: isMobile ? "16px" : "24px",
          width: isMobile ? "56px" : "60px",
          height: isMobile ? "56px" : "60px",
          borderRadius: "50%",
          boxShadow: "0 12px 26px rgba(213, 63, 140, 0.35)",
          zIndex: 35,
        }}
      >
        🛒
        {cartProductsCount > 0 && <CartCount>{cartProductsCount}</CartCount>}
      </CartButton>

      {user && profileOpen && (
        <ModalOverlay>
          <ModalBox
            style={{
              width: isMobile ? "94%" : "440px",
              borderRadius: "28px",
              padding: isMobile ? "22px 16px" : "28px",
            }}
          >
            <CloseButton onClick={() => setProfileOpen(false)}>×</CloseButton>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #d53f8c 0%, #97266d 100%)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: 700,
                  }}
                >
                  {userInitial}
                </div>
              )}

              <ModalTitle style={{ marginBottom: 0 }}>{userName}</ModalTitle>
              <ModalText style={{ marginBottom: 0 }}>
                Gmail: {user.email || "Նշված չէ"}
              </ModalText>
              {(user.phone || user.user_metadata?.phone) && (
                <ModalText style={{ marginBottom: 0 }}>
                  Հեռախոս: {user.phone || user.user_metadata?.phone}
                </ModalText>
              )}
            </div>

            <ModalButtons>
              <Button
                type="button"
                $small
                style={{ borderRadius: "999px" }}
                onClick={handleLogout}
              >
                Դուրս գալ հաշվից
              </Button>
              <Button
                type="button"
                $small
                style={{ borderRadius: "999px" }}
                onClick={() => setProfileOpen(false)}
              >
                Փակել
              </Button>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

      {authOpen && (
        <ModalOverlay>
          <ModalBox
            style={{
              width: isMobile ? "94%" : "440px",
              borderRadius: "28px",
              padding: isMobile ? "22px 16px" : "28px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <CloseButton
              onClick={() => {
                setAuthOpen(false);
                setOtpSent(false);
                setAuthError("");
              }}
            >
              ×
            </CloseButton>

            <ModalTitle>Մուտք կամ գրանցում</ModalTitle>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={authLoading}
              style={{
                width: "100%",
                padding: "12px 14px",
                marginBottom: "14px",
                borderRadius: "999px",
                border: "1.5px solid #e2e8f0",
                background: "#ffffff",
                color: "#1a202c",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <span style={{ fontWeight: 800, color: "#d53f8c" }}>G</span>
              <span>
                {authLoading ? "Միացում Google-ին..." : "Շարունակել Google-ով"}
              </span>
            </button>

            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#718096",
                marginBottom: "12px",
              }}
            >
              ԿԱՄ
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
              <Button
                type="button"
                $small
                style={{ flex: 1, borderRadius: "999px" }}
                onClick={() => {
                  setAuthMethod("email");
                  setOtpSent(false);
                  setAuthError("");
                }}
              >
                Gmail / Email
              </Button>
              <Button
                type="button"
                $small
                style={{ flex: 1, borderRadius: "999px" }}
                onClick={() => {
                  setAuthMethod("phone");
                  setOtpSent(false);
                  setAuthError("");
                }}
              >
                Հեռախոսահամար
              </Button>
            </div>

            {authError && (
              <p
                style={{
                  color: "#e53e3e",
                  fontSize: "13.5px",
                  marginBottom: "10px",
                }}
              >
                {authError}
              </p>
            )}

            {authMethod === "email" ? (
              <ModalForm onSubmit={handleEmailAuth}>
                <ModalInput
                  type="text"
                  placeholder="Ձեր անունը"
                  value={authForm.fullName}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, fullName: e.target.value })
                  }
                  style={{ borderRadius: "999px", padding: "11px 16px" }}
                />

                {authMode === "register" && (
                  <PhoneInputWithFlag
                    countryCode={authForm.countryCode}
                    onCountryChange={(code) =>
                      setAuthForm({ ...authForm, countryCode: code })
                    }
                    digits={authForm.phoneDigits}
                    onDigitsChange={(digits) =>
                      setAuthForm({ ...authForm, phoneDigits: digits })
                    }
                    isMobile={isMobile}
                  />
                )}

                <ModalInput
                  type="email"
                  placeholder="Ձեր Gmail հասցեն"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  required
                  style={{ borderRadius: "999px", padding: "11px 16px" }}
                />

                <ModalInput
                  type="password"
                  placeholder="Գաղտնաբառ (առնվազն 6 նիշ)"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  required
                  style={{ borderRadius: "999px", padding: "11px 16px" }}
                />

                <ModalButtons>
                  <Button
                    type="submit"
                    $small
                    disabled={authLoading}
                    style={{ borderRadius: "999px" }}
                  >
                    {authLoading
                      ? "Սպասեք..."
                      : authMode === "register"
                      ? "Գրանցվել"
                      : "Մուտք գործել"}
                  </Button>

                  <Button
                    type="button"
                    $small
                    style={{ borderRadius: "999px" }}
                    onClick={() => {
                      setAuthMode(authMode === "login" ? "register" : "login");
                      setAuthError("");
                    }}
                  >
                    {authMode === "login" ? "Նոր հաշիվ" : "Արդեն ունեմ հաշիվ"}
                  </Button>
                </ModalButtons>
              </ModalForm>
            ) : !otpSent ? (
              <ModalForm onSubmit={handleSendPhoneOtp}>
                <ModalInput
                  type="text"
                  placeholder="Ձեր անունը (ըստ ցանկության)"
                  value={authForm.fullName}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, fullName: e.target.value })
                  }
                  style={{ borderRadius: "999px", padding: "11px 16px" }}
                />

                <PhoneInputWithFlag
                  countryCode={authForm.countryCode}
                  onCountryChange={(code) =>
                    setAuthForm({ ...authForm, countryCode: code })
                  }
                  digits={authForm.phoneDigits}
                  onDigitsChange={(digits) =>
                    setAuthForm({ ...authForm, phoneDigits: digits })
                  }
                  isMobile={isMobile}
                  required
                />

                <ModalButtons>
                  <Button
                    type="submit"
                    $small
                    disabled={authLoading}
                    style={{ borderRadius: "999px" }}
                  >
                    {authLoading ? "Ուղարկվում է..." : "Ուղարկել SMS կոդ"}
                  </Button>
                </ModalButtons>
              </ModalForm>
            ) : (
              <ModalForm onSubmit={handleVerifyPhoneOtp}>
                <ModalText>
                  Կոդն ուղարկվել է{" "}
                  {getFullPhone(authForm.countryCode, authForm.phoneDigits)}{" "}
                  համարին
                </ModalText>

                <ModalInput
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="SMS կոդը (6 թիվ)"
                  value={authForm.otp}
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      otp: e.target.value.replace(/\D/g, "").slice(0, 6),
                    })
                  }
                  required
                  style={{ borderRadius: "999px", padding: "11px 16px" }}
                />

                <ModalButtons>
                  <Button
                    type="submit"
                    $small
                    disabled={authLoading}
                    style={{ borderRadius: "999px" }}
                  >
                    {authLoading ? "Ստուգվում է..." : "Հաստատել կոդը"}
                  </Button>

                  <Button
                    type="button"
                    $small
                    style={{ borderRadius: "999px" }}
                    onClick={() => setOtpSent(false)}
                  >
                    Փոխել համարը
                  </Button>
                </ModalButtons>
              </ModalForm>
            )}
          </ModalBox>
        </ModalOverlay>
      )}

      {cartOpen && (
        <ModalOverlay>
          <CartBox
            style={{
              width: isMobile ? "95%" : "520px",
              borderRadius: "28px",
              padding: isMobile ? "18px 14px" : "26px",
              maxHeight: "88vh",
              overflowY: "auto",
            }}
          >
            <CloseButton onClick={() => setCartOpen(false)}>×</CloseButton>

            <CartHeader>
              <CartLogo src={logo} alt="Areg flowers" />
              <ModalTitle style={{ marginBottom: 0 }}>Ձեր զամբյուղը</ModalTitle>
            </CartHeader>

            {cart.length === 0 ? (
              <ModalText>Զամբյուղը դատարկ է</ModalText>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "10px 12px",
                    marginBottom: "12px",
                    borderRadius: "16px",
                    background: "#fff5f7",
                    border: "1px solid #fed7e2",
                  }}
                >
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontSize: isMobile ? "13px" : "14px",
                      fontWeight: 700,
                      color: "#97266d",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        cart.length > 0 &&
                        selectedCartIds.length === cart.length
                      }
                      onChange={toggleSelectAllCart}
                      style={{
                        width: "18px",
                        height: "18px",
                        accentColor: "#d53f8c",
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      Նշել բոլորը ({selectedCartIds.length}/{cart.length})
                    </span>
                  </label>

                  {selectedCartIds.length > 0 && (
                    <button
                      type="button"
                      onClick={deleteSelectedFromCart}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: "1px solid #feb2b2",
                        background: "#fff5f5",
                        color: "#c53030",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Ջնջել նշվածները ({selectedCartIds.length})
                    </button>
                  )}
                </div>

                <CartItems>
                  {cart.map((item) => {
                    const isChecked = selectedCartIds.includes(item.id);
                    return (
                      <CartItem
                        key={item.id}
                        style={{
                          borderRadius: "16px",
                          padding: isMobile ? "10px" : "12px",
                          border: isChecked
                            ? "1.5px solid #f687b3"
                            : "1px solid #edf2f7",
                          background: isChecked ? "#fff9fb" : "#ffffff",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectCartItem(item.id)}
                            style={{
                              width: "19px",
                              height: "19px",
                              accentColor: "#d53f8c",
                              cursor: "pointer",
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong
                              style={{
                                display: "block",
                                fontSize: isMobile ? "14px" : "15px",
                              }}
                            >
                              {item.title}
                            </strong>
                            <p
                              style={{
                                margin: 0,
                                fontSize: isMobile ? "12.5px" : "13.5px",
                              }}
                            >
                              {item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>

                        <CartActions>
                          <RoundActionButton
                            type="button"
                            onClick={() => minusFromCart(item.id)}
                          >
                            -
                          </RoundActionButton>
                          <RoundActionButton
                            type="button"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </RoundActionButton>
                          <DeleteActionButton
                            type="button"
                            onClick={() => deleteFromCart(item.id)}
                          >
                            ×
                          </DeleteActionButton>
                        </CartActions>
                      </CartItem>
                    );
                  })}
                </CartItems>

                <ModalText style={{ marginTop: "12px" }}>
                  <strong>
                    Նշվածների ընդհանուր գումար ({selectedQuantityCount} հատ)՝{" "}
                    {totalPrice} դրամ
                  </strong>
                </ModalText>

                <ModalButtons>
                  <Button
                    type="button"
                    $small
                    disabled={selectedCartIds.length === 0}
                    style={{
                      borderRadius: "999px",
                      opacity: selectedCartIds.length === 0 ? 0.5 : 1,
                    }}
                    onClick={() => {
                      if (selectedCartIds.length === 0) {
                        showToast("Նախ նշեք ապրանքները", 2000);
                        return;
                      }
                      setCartOpen(false);
                      setOrderOpen(true);
                    }}
                  >
                    Պատվիրել նշվածները ({selectedCartIds.length})
                  </Button>
                  <Button
                    type="button"
                    $small
                    style={{ borderRadius: "999px" }}
                    onClick={() => setCartOpen(false)}
                  >
                    Փակել
                  </Button>
                </ModalButtons>
              </>
            )}
          </CartBox>
        </ModalOverlay>
      )}

      {orderOpen && (
        <ModalOverlay>
          <ModalBox
            style={{
              width: isMobile ? "94%" : "440px",
              borderRadius: "28px",
              padding: isMobile ? "22px 16px" : "28px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <CloseButton onClick={() => setOrderOpen(false)}>×</CloseButton>
            <ModalTitle>Ձևակերպել պատվերը</ModalTitle>

            <ModalForm onSubmit={handleOrderSubmit}>
              <ModalInput
                type="text"
                placeholder="Ձեր անունը"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{ borderRadius: "999px", padding: "11px 16px" }}
              />

              <PhoneInputWithFlag
                countryCode={form.countryCode}
                onCountryChange={(code) =>
                  setForm({ ...form, countryCode: code })
                }
                digits={form.phoneDigits}
                onDigitsChange={(digits) =>
                  setForm({ ...form, phoneDigits: digits })
                }
                isMobile={isMobile}
                required
              />

              <ModalInput
                type="text"
                placeholder="Առաքման հասցեն"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                style={{ borderRadius: "999px", padding: "11px 16px" }}
              />

              <ModalSelect
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                style={{ borderRadius: "999px", padding: "11px 16px" }}
              >
                <option value="cash">Վճարում առաքման պահին</option>
                <option value="card">Քարտով վճարում</option>
              </ModalSelect>

              <ModalText>
                <strong>
                  Ընտրված ապրանքներ ({selectedItems.length})՝ {totalPrice} դրամ
                </strong>
              </ModalText>

              <ModalButtons>
                <Button
                  type="submit"
                  $small
                  disabled={loading}
                  style={{ borderRadius: "999px" }}
                >
                  {loading
                    ? "Փոխանցվում է..."
                    : form.payment === "card"
                    ? "Անցնել քարտով վճարման"
                    : "Հաստատել պատվերը"}
                </Button>
                <Button
                  type="button"
                  $small
                  style={{ borderRadius: "999px" }}
                  onClick={() => setOrderOpen(false)}
                >
                  Չեղարկել
                </Button>
              </ModalButtons>
            </ModalForm>
          </ModalBox>
        </ModalOverlay>
      )}

      {cardPaymentOpen && (
        <ModalOverlay>
          <ModalBox
            style={{
              width: isMobile ? "94%" : "450px",
              borderRadius: "32px",
              padding: isMobile ? "20px 14px" : "28px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "linear-gradient(180deg, #fff9fb 0%, #ffffff 100%)",
              boxSizing: "border-box",
            }}
          >
            <CloseButton onClick={() => setCardPaymentOpen(false)}>×</CloseButton>

            <ModalTitle style={{ marginBottom: "6px" }}>
              💳 Քարտով վճարում և փոխանցում
            </ModalTitle>
            <ModalText style={{ marginBottom: "16px" }}>
              Փոխանցման գումար՝ <strong>{totalPrice} դրամ</strong>
            </ModalText>

            <div
              style={{
                background:
                  "radial-gradient(circle at top left, #ff7eb3 0%, #d53f8c 52%, #701a75 100%)",
                color: "#fff",
                borderRadius: isMobile ? "999px" : "120px",
                width: "100%",
                minHeight: isMobile ? "132px" : "164px",
                padding: isMobile ? "18px 22px" : "24px 36px",
                marginBottom: "18px",
                boxShadow: "0 16px 32px rgba(151, 38, 109, 0.28)",
                border: "2px solid rgba(255, 255, 255, 0.55)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "10.5px",
                  opacity: 0.9,
                  marginBottom: "6px",
                  letterSpacing: "1.4px",
                  fontWeight: 700,
                }}
              >
                AREG FLOWERS • SMART CARD
              </div>
              <div
                style={{
                  fontSize: isMobile ? "15px" : "18.5px",
                  letterSpacing: "2px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                {cardForm.cardNumber || "•••• •••• •••• ••••"}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <span>{cardForm.holderName || "ՔԱՐՏԱՊԱՆ"}</span>
                <span>•</span>
                <span>{cardForm.expiry || "MM/YY"}</span>
              </div>
            </div>

            <ModalForm
              onSubmit={handleCardPaymentSubmit}
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <ModalInput
                type="text"
                placeholder="Քարտապանի անուն ազգանունը"
                value={cardForm.holderName}
                onChange={(e) =>
                  setCardForm({ ...cardForm, holderName: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: "999px",
                  padding: "11px 16px",
                }}
              />

              <ModalInput
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="Քարտի համարը (16 թիվ)"
                value={cardForm.cardNumber}
                onChange={(e) =>
                  setCardForm({
                    ...cardForm,
                    cardNumber: formatCardNumber(e.target.value),
                  })
                }
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: "999px",
                  padding: "11px 16px",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  gap: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <ModalInput
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={cardForm.expiry}
                  onChange={(e) =>
                    setCardForm({
                      ...cardForm,
                      expiry: formatExpiry(e.target.value),
                    })
                  }
                  required
                  style={{
                    width: "100%",
                    minWidth: 0,
                    boxSizing: "border-box",
                    borderRadius: "999px",
                    padding: "11px 14px",
                    textAlign: "center",
                  }}
                />

                <ModalInput
                  type="password"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="CVV"
                  value={cardForm.cvv}
                  onChange={(e) =>
                    setCardForm({
                      ...cardForm,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                    })
                  }
                  required
                  style={{
                    width: "100%",
                    minWidth: 0,
                    boxSizing: "border-box",
                    borderRadius: "999px",
                    padding: "11px 12px",
                    textAlign: "center",
                    letterSpacing: "2px",
                  }}
                />
              </div>

              <ModalButtons>
                <Button
                  type="submit"
                  $small
                  disabled={loading}
                  style={{ borderRadius: "999px" }}
                >
                  {loading
                    ? "Փոխանցվում է..."
                    : `Փոխանցել ${totalPrice} դրամ`}
                </Button>
                <Button
                  type="button"
                  $small
                  style={{ borderRadius: "999px" }}
                  onClick={() => {
                    setCardPaymentOpen(false);
                    setOrderOpen(true);
                  }}
                >
                  ← Հետ
                </Button>
              </ModalButtons>
            </ModalForm>
          </ModalBox>
        </ModalOverlay>
      )}

      {success && <SuccessBox>{successText}</SuccessBox>}
    </Page>
  );
}

export default FlowerShop;