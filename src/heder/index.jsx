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
const logo = "/areg-flowers-logo.png";

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

function getPriceNumber(price) {
  return Number(String(price).replace(/,/g, "").replace(" դրամ", ""));
}

function normalizePhone(rawPhone) {
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (!cleaned) return "";
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0") && cleaned.length === 9) {
    return `+374${cleaned.slice(1)}`;
  }
  if (cleaned.length === 8) {
    return `+374${cleaned}`;
  }
  return `+${cleaned}`;
}

function FlowerShop() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Ավելացվեց զամբյուղ ✅");
  const [loading, setLoading] = useState(false);

  // Auth states
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState("email"); // "email" | "phone"
  const [authMode, setAuthMode] = useState("login"); // "login" | "register" (for email)
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const showToast = (msg, duration = 2000) => {
    setSuccessText(msg);
    setSuccess(true);
    setTimeout(() => setSuccess(false), duration);
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const currentUser = data?.session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        setForm((prev) => ({
          ...prev,
          name: prev.name || currentUser.user_metadata?.full_name || "",
          phone: prev.phone || currentUser.phone || currentUser.user_metadata?.phone || "",
        }));
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        setForm((prev) => ({
          ...prev,
          name: prev.name || currentUser.user_metadata?.full_name || "",
          phone: prev.phone || currentUser.phone || currentUser.user_metadata?.phone || "",
        }));
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const emailClean = authForm.email.trim();
      if (!emailClean || !authForm.password) {
        setAuthError("Լրացրեք Gmail/Email-ը և գաղտնաբառը։");
        return;
      }

      if (authMode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: emailClean,
          password: authForm.password,
          options: {
            data: {
              full_name: authForm.fullName.trim(),
              phone: authForm.phone.trim(),
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
            name: authForm.fullName.trim() || prev.name,
            phone: authForm.phone.trim() || prev.phone,
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

        if (data?.user) {
          setForm((prev) => ({
            ...prev,
            name: prev.name || data.user.user_metadata?.full_name || "",
            phone: prev.phone || data.user.user_metadata?.phone || "",
          }));
        }

        setAuthOpen(false);
        showToast("Մուտքը հաջողվեց ✅");
      }
    } catch (err) {
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
      const formattedPhone = normalizePhone(authForm.phone);
      if (!formattedPhone || formattedPhone.length < 8) {
        setAuthError("Մուտքագրեք ճիշտ հեռախոսահամար (օրինակ՝ +37477123456)։");
        return;
      }

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

      setAuthForm((prev) => ({ ...prev, phone: formattedPhone }));
      setOtpSent(true);
      showToast("SMS կոդն ուղարկվեց 📩");
    } catch (err) {
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
      const formattedPhone = normalizePhone(authForm.phone);
      const tokenClean = authForm.otp.trim();

      if (!tokenClean) {
        setAuthError("Մուտքագրեք SMS-ով ստացված կոդը։");
        return;
      }

      const { data, error } = await supabase.auth.verifyOtp({
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
        phone: data?.user?.phone || formattedPhone || prev.phone,
      }));

      setAuthOpen(false);
      setOtpSent(false);
      setAuthForm((prev) => ({ ...prev, otp: "" }));
      showToast("Մուտքը հեռախոսահամարով հաջողվեց ✅");
    } catch (err) {
      setAuthError("Կոդի ստուգման սխալ։");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    showToast("Դուրս եկաք հաշվից");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    showToast("Ավելացվեց զամբյուղ ✅", 1500);
  };

  const minusFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartProductsCount = cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((total, item) => {
    return total + getPriceNumber(item.price) * item.quantity;
  }, 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Զամբյուղը դատարկ է։ Նախ ավելացրու ծաղիկ։");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.payment) {
      alert("Լրացրեք բոլոր դաշտերը։");
      return;
    }

    setLoading(true);

    const productsText = cart
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

    const orderMessage = `
🌸 Նոր պատվեր Areg flowers կայքից

Հաճախորդի տվյալներ
Անուն: ${form.name}
Հեռախոս: ${form.phone}
Հասցե: ${form.address}
${userAccountInfo}

Վճարում
${form.payment === "cash" ? "Վճարում առաքման պահին" : "Քարտով վճարում"}

Պատվերներ
${productsText}

Ընդհանուր գումար: ${totalPrice} դրամ
`;

    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "🌸 Նոր պատվեր Areg flowers կայքից",
      from_name: "Areg flowers",
      name: form.name,
      phone: form.phone,
      address: form.address,
      account: userAccountInfo,
      payment:
        form.payment === "cash"
          ? "Վճարում առաքման պահին"
          : "Քարտով վճարում",
      products: productsText,
      totalPrice: `${totalPrice} դրամ`,
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
        alert(data.message || "Պատվերը չուղարկվեց ❌ Ստուգիր Web3Forms-ը։");
        return;
      }

      alert("Պատվերը ուղարկվեց ✅ Ստուգիր Gmail-ը կամ Spam-ը։");

      setOrderOpen(false);
      setCartOpen(false);
      setCart([]);
      setForm({
        name: user?.user_metadata?.full_name || "",
        phone: user?.phone || user?.user_metadata?.phone || "",
        address: "",
        payment: "cash",
      });

      showToast("Պատվերը գրանցվեց ✅", 3000);
    } catch (error) {
      console.log("WEB3FORMS FETCH ERROR:", error);
      alert("Սխալ տեղի ունեցավ ❌ Ինտերնետը կամ Web3Forms-ը ստուգիր։");
    } finally {
      setLoading(false);
    }
  };

  const userDisplayLabel =
    user?.user_metadata?.full_name || user?.email || user?.phone || "Հաշիվ";

  return (
    <Page>
      <Header>
        <Logo>
          <img src={logo} alt="Areg flowers" />
          <span>Areg flowers</span>
        </Logo>

        <Nav>
          <a href="#home">Գլխավոր</a>
          <a href="#products">Ծաղիկներ</a>
          <a href="#about">Մեր մասին</a>
          <a href="#contact">Կապ</a>

          {user ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "13px",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background: "#fff0f6",
                  color: "#b83280",
                  fontWeight: 600,
                }}
              >
                {userDisplayLabel}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  border: "1px solid #d53f8c",
                  background: "transparent",
                  color: "#d53f8c",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Ելք
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setAuthError("");
                setAuthOpen(true);
              }}
              style={{
                padding: "7px 14px",
                borderRadius: "999px",
                border: "none",
                background: "#d53f8c",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Մուտք / Գրանցում
            </button>
          )}
        </Nav>
      </Header>

      <Hero id="home">
        <HeroText>
          <Title>Ծաղիկներ, որոնք խոսում են ձեր փոխարեն</Title>
          <Subtitle>
            Areg flowers-ում կգտնես գեղեցիկ ծաղկեփնջեր, վարդեր, աստրոմերիա և
            նուրբ ծաղկային ձևավորումներ ցանկացած առիթի համար։
          </Subtitle>

          <Button onClick={() => setCartOpen(true)}>Բացել զամբյուղը</Button>
        </HeroText>

        <HeroCard>
          <FlowerImg src={logo} alt="Areg flowers" />
        </HeroCard>
      </Hero>

      <Section id="products">
        <SectionTitle>Մեր ծաղիկները</SectionTitle>

        <Cards>
          {products.map((item) => (
            <Card key={item.id}>
              <PlusButton onClick={() => addToCart(item)}>+</PlusButton>

              <CardImg src={item.img} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
              <Price>{item.price}</Price>

              <Button onClick={() => addToCart(item)} $small>
                Ավելացնել զամբյուղ
              </Button>
            </Card>
          ))}
        </Cards>

        <MoreControls>
          <h3>Տեսնել բաժինները</h3>
          <p>Ընտրիր ծաղկի տեսակը և բացիր ապրանքները</p>

          <div>
            {Object.entries(categoryItems).map(([key, category]) => (
              <MoreButton
                key={key}
                type="button"
                $active={activeCategory === key}
                onClick={() =>
                  setActiveCategory(activeCategory === key ? null : key)
                }
              >
                {category.button}
              </MoreButton>
            ))}
          </div>
        </MoreControls>

        {activeCategory && (
          <MoreBox>
            <SectionTitle>{categoryItems[activeCategory].title}</SectionTitle>

            <Cards>
              {categoryItems[activeCategory].items.map((item) => (
                <Card key={item.id}>
                  <PlusButton onClick={() => addToCart(item)}>+</PlusButton>

                  <CardImg src={item.img} alt={item.title} />
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.text}</CardText>
                  <Price>{item.price}</Price>

                  <Button $small onClick={() => addToCart(item)}>
                    Ավելացնել զամբյուղ
                  </Button>
                </Card>
              ))}
            </Cards>
          </MoreBox>
        )}
      </Section>

      <SmallSection id="about">
        <SectionTitle>Ինչու ընտրել մեզ</SectionTitle>

        <AboutCards>
          <Card>
            <CardTitle>Թարմ ծաղիկներ</CardTitle>
            <CardText>
              Ընտրում ենք գեղեցիկ և թարմ ծաղիկներ ամեն պատվերի համար։
            </CardText>
          </Card>

          <Card>
            <CardTitle>Գեղեցիկ փաթեթավորում</CardTitle>
            <CardText>
              Յուրաքանչյուր ծաղկեփունջ պատրաստվում է խնամքով։
            </CardText>
          </Card>

          <Card>
            <CardTitle>Արագ առաքում</CardTitle>
            <CardText>
              Առաքում Երևանում և մարզերում՝ հարմար պայմաններով։
            </CardText>
          </Card>
        </AboutCards>
      </SmallSection>

      <Footer id="contact">
        <h2>Areg flowers</h2>
        <p>Ծաղիկներ, որոնք խոսում են ձեր փոխարեն՝ ծաղկեփնջեր, վարդեր, պսակներ և աստրոմերիա</p>
        <p>Հեռ․ +374 77 88 44 67</p>
      </Footer>

      <CartButton onClick={() => setCartOpen(true)}>
        🛒
        {cartProductsCount > 0 && <CartCount>{cartProductsCount}</CartCount>}
      </CartButton>

      {authOpen && (
        <ModalOverlay>
          <ModalBox>
            <CloseButton
              onClick={() => {
                setAuthOpen(false);
                setOtpSent(false);
                setAuthError("");
              }}
            >
              ×
            </CloseButton>

            <ModalTitle>
              {authMethod === "email"
                ? authMode === "register"
                  ? "Գրանցում Gmail-ով"
                  : "Մուտք Gmail-ով"
                : "Մուտք / Գրանցում հեռախոսահամարով"}
            </ModalTitle>

            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
              <Button
                type="button"
                $small
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
              <p style={{ color: "#e53e3e", fontSize: "14px", marginBottom: "10px" }}>
                {authError}
              </p>
            )}

            {authMethod === "email" ? (
              <ModalForm onSubmit={handleEmailAuth}>
                {authMode === "register" && (
                  <>
                    <ModalInput
                      type="text"
                      placeholder="Ձեր անունը"
                      value={authForm.fullName}
                      onChange={(e) =>
                        setAuthForm({ ...authForm, fullName: e.target.value })
                      }
                    />
                    <ModalInput
                      type="tel"
                      placeholder="Հեռախոսահամար (ըստ ցանկության)"
                      value={authForm.phone}
                      onChange={(e) =>
                        setAuthForm({ ...authForm, phone: e.target.value })
                      }
                    />
                  </>
                )}

                <ModalInput
                  type="email"
                  placeholder="Ձեր Gmail հասցեն"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  required
                />

                <ModalInput
                  type="password"
                  placeholder="Գաղտնաբառ (առնվազն 6 նիշ)"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  required
                />

                <ModalButtons>
                  <Button type="submit" $small disabled={authLoading}>
                    {authLoading
                      ? "Սպասեք..."
                      : authMode === "register"
                      ? "Գրանցվել"
                      : "Մուտք գործել"}
                  </Button>

                  <Button
                    type="button"
                    $small
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
                />

                <ModalInput
                  type="tel"
                  placeholder="+374 77 12 34 56"
                  value={authForm.phone}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, phone: e.target.value })
                  }
                  required
                />

                <ModalButtons>
                  <Button type="submit" $small disabled={authLoading}>
                    {authLoading ? "Ուղարկվում է..." : "Ուղարկել SMS կոդ"}
                  </Button>
                </ModalButtons>
              </ModalForm>
            ) : (
              <ModalForm onSubmit={handleVerifyPhoneOtp}>
                <ModalText>
                  Կոդն ուղարկվել է {authForm.phone} համարին
                </ModalText>

                <ModalInput
                  type="text"
                  placeholder="SMS կոդը (օրինակ՝ 123456)"
                  value={authForm.otp}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, otp: e.target.value })
                  }
                  required
                />

                <ModalButtons>
                  <Button type="submit" $small disabled={authLoading}>
                    {authLoading ? "Ստուգվում է..." : "Հաստատել կոդը"}
                  </Button>

                  <Button
                    type="button"
                    $small
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
          <CartBox>
            <CloseButton onClick={() => setCartOpen(false)}>×</CloseButton>

            <CartHeader>
              <CartLogo>
                <img src={logo} alt="Areg flowers" />
                <div>
                  <span>Areg flowers</span>
                  <small>Ձեր զամբյուղը</small>
                </div>
              </CartLogo>
            </CartHeader>

            {cart.length === 0 ? (
              <ModalText>Զամբյուղը դատարկ է</ModalText>
            ) : (
              <>
                <CartItems>
                  {cart.map((item) => (
                    <CartItem key={item.id}>
                      <img src={item.img} alt={item.title} />

                      <div>
                        <h4>{item.title}</h4>
                        <p>Գին՝ {item.price}</p>
                        <p>Քանակ՝ {item.quantity}</p>
                        <p>
                          Ընդհանուր՝{" "}
                          {getPriceNumber(item.price) * item.quantity} դրամ
                        </p>
                      </div>

                      <CartActions>
                        <RoundActionButton onClick={() => addToCart(item)}>
                          +
                        </RoundActionButton>

                        <RoundActionButton
                          onClick={() => minusFromCart(item.id)}
                        >
                          −
                        </RoundActionButton>

                        <DeleteActionButton
                          onClick={() => deleteFromCart(item.id)}
                        >
                          ×
                        </DeleteActionButton>
                      </CartActions>
                    </CartItem>
                  ))}
                </CartItems>

                <h3
                  style={{
                    color: "#b83280",
                    marginBottom: "22px",
                    textAlign: "center",
                  }}
                >
                  Ընդհանուր գումար՝ {totalPrice} դրամ
                </h3>

                <Button onClick={() => setOrderOpen(true)}>
                  Պատվիրել զամբյուղի ապրանքները
                </Button>
              </>
            )}
          </CartBox>
        </ModalOverlay>
      )}

      {orderOpen && (
        <ModalOverlay>
          <ModalBox>
            <CloseButton onClick={() => setOrderOpen(false)}>×</CloseButton>

            <ModalTitle>Պատվիրել ծաղիկներ</ModalTitle>
            <ModalText>
              Լրացրեք տվյալները, և մենք կապ կհաստատենք Ձեզ հետ։
            </ModalText>

            <ModalForm onSubmit={handleOrderSubmit}>
              <ModalInput
                type="text"
                placeholder="Ձեր անունը"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <ModalInput
                type="tel"
                placeholder="Հեռախոսահամար"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <ModalInput
                type="text"
                placeholder="Հասցե"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />

              <ModalSelect
                required
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
              >
                <option value="cash">Վճարում առաքման պահին</option>
                <option value="card">Քարտով վճարում</option>
              </ModalSelect>

              <ModalText>Պատվերի ընդհանուր գումար՝ {totalPrice} դրամ</ModalText>

              <ModalButtons>
                <Button $small type="submit" disabled={loading}>
                  {loading ? "Ուղարկվում է..." : "Ուղարկել պատվեր"}
                </Button>

                <Button $small type="button" onClick={() => setOrderOpen(false)}>
                  Փակել
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