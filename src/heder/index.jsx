import React, { useState } from "react";
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
  TreeImg,
  Section,
  SectionTitle,
  Cards,
  Card,
  CardImg,
  CardTitle,
  CardText,
  Price,
  Footer,
  MoreBox,
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
  CartButton,
  CartCount,
  CartItems,
  CartItem,
  SuccessBox,
} from "./styled";

import treeLogo from "./img/2.png";

const products = [
  {
    id: "classic",
    img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600",
    title: "Դասական տոնածառ",
    text: "Փարթամ, կանաչ և շատ գեղեցիկ տարբերակ տան համար։",
    price: "25,000 դրամ",
  },
  {
    id: "lux",
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600",
    title: "Լյուքս տոնածառ",
    text: "Պրեմիում տեսք՝ լույսերով և խաղալիքներով։",
    price: "45,000 դրամ",
  },
  {
    id: "small",
    img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600",
    title: "Փոքր տոնածառ",
    text: "Հարմար է սենյակի, գրասենյակի կամ նվերի համար։",
    price: "15,000 դրամ",
  },
];

const classicTrees = Array.from({ length: 27 }, (_, index) => ({
  id: `classic-${index + 1}`,
  img: [
    "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600",
    "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600",
    "https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=600",
  ][index % 3],
  title: `Դասական տոնածառ ${index + 1}`,
  text: "Գեղեցիկ դասական տոնածառ՝ տան և սրահի համար։",
  price: `${25 + index},000 դրամ`,
}));

const luxTrees = Array.from({ length: 27 }, (_, index) => ({
  id: `lux-${index + 1}`,
  img: [
    "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600",
    "https://images.unsplash.com/photo-1543932927-a9def13a0e7c?w=600",
    "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600",
  ][index % 3],
  title: `Լյուքս տոնածառ ${index + 1}`,
  text: "Շքեղ լյուքս տոնածառ՝ պրեմիում տեսքով և տոնական լույսերով։",
  price: `${45 + index},000 դրամ`,
}));

const smallTrees = Array.from({ length: 27 }, (_, index) => ({
  id: `small-${index + 1}`,
  img: [
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600",
    "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600",
    "https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=600",
  ][index % 3],
  title: `Փոքր տոնածառ ${index + 1}`,
  text: "Փոքր և կոկիկ տոնածառ՝ սենյակի, գրասենյակի կամ նվերի համար։",
  price: `${15 + index},000 դրամ`,
}));

const moreProducts = {
  classic: {
    title: "Դասական տոնածառներ",
    items: classicTrees,
  },
  lux: {
    title: "Լյուքս տոնածառներ",
    items: luxTrees,
  },
  small: {
    title: "Փոքր տոնածառներ",
    items: smallTrees,
  },
};

function getPriceNumber(price) {
  return Number(price.replace(/,/g, "").replace(" դրամ", ""));
}

function Tonacarner() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "",
  });

  const handleOpen = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingProduct = prev.find((cartItem) => cartItem.id === item.id);

      if (existingProduct) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    setCartOpen(true);
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
      alert("Զամբյուղը դատարկ է։ Նախ ավելացրու ապրանք։");
      return;
    }

    const orderData = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      payment: form.payment,
      products: cart,
      totalPrice,
    };

    console.log("Ուղարկվող տվյալներ:", orderData);

    try {
      const response = await fetch("http://localhost:5001/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        alert("Պատվերը չուղարկվեց: " + data.message);
        return;
      }

      if (form.payment === "card") {
        alert(
          "Պատվերը գրանցվեց ✅ Հիմա պետք է բացվի բանկի/Idram/Telcell-ի ապահով վճարման էջը։"
        );

        // Երբ ունենաս իրական payment link/API, սա կբացես
        // window.location.href = data.paymentUrl;
      } else {
        alert("Պատվերը ուղարկվեց ✅");
      }

      setOrderOpen(false);
      setCartOpen(false);
      setCart([]);
      setForm({
        name: "",
        phone: "",
        address: "",
        payment: "",
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Չի միանում server-ին։ Ստուգիր՝ node server/server.js աշխատում է, թե չէ։");
    }
  };

  return (
    <Page>
      <Header>
        <Logo>
          <img src={treeLogo} alt="Tonacar.am" />
          <span>Tonacar.am</span>
        </Logo>

        <Nav>
          <a href="#home">Գլխավոր</a>
          <a href="#products">Տոնածառներ</a>
          <a href="#about">Մեր մասին</a>
          <a href="#contact">Կապ</a>
        </Nav>
      </Header>

      <Hero id="home">
        <HeroText>
          <Title>Դեկորային գեղեցիկ տոնածառներ</Title>
          <Subtitle>
            Ստեղծիր տոնական մթնոլորտ քո տանը՝ շքեղ, փարթամ և լուսավոր
            տոնածառներով։
          </Subtitle>

          <Button onClick={() => setCartOpen(true)}>Բացել զամբյուղը</Button>
        </HeroText>

        <HeroCard>
          <TreeImg src={treeLogo} alt="Christmas tree" />
        </HeroCard>
      </Hero>

      <Section id="products">
        <SectionTitle>Մեր տոնածառները</SectionTitle>

        <Cards>
          {products.map((item) => (
            <Card key={item.id}>
              <PlusButton onClick={() => addToCart(item)}>+</PlusButton>

              <CardImg src={item.img} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
              <Price>{item.price}</Price>

              <Button onClick={() => handleOpen(item.id)} $small>
                {activeCategory === item.id ? "Փակել" : "Տեսնել ավելին"}
              </Button>
            </Card>
          ))}
        </Cards>

        {activeCategory && (
          <MoreBox>
            <SectionTitle>{moreProducts[activeCategory].title}</SectionTitle>

            <Cards>
              {moreProducts[activeCategory].items.map((item) => (
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

      <Section id="about">
        <SectionTitle>Ինչու ընտրել մեզ</SectionTitle>

        <Cards>
          <Card>
            <CardTitle>Բարձր որակ</CardTitle>
            <CardText>
              Մեր տոնածառները շատ խիտ են, գեղեցիկ և երկար օգտագործվող։
            </CardText>
          </Card>

          <Card>
            <CardTitle>Արագ առաքում</CardTitle>
            <CardText>Առաքում Երևանում և մարզերում՝ արագ և հարմար։</CardText>
          </Card>

          <Card>
            <CardTitle>Տոնական դիզայն</CardTitle>
            <CardText>
              Մեր դիզայնները յուրահատուկ են և համապատասխանում են ցանկացած
              ինտերիերի։
            </CardText>
          </Card>
        </Cards>
      </Section>

      <Footer id="contact">
        <h2>Tonacar.am</h2>
        <p>Դեկորային տոնածառներ և զարդարանքներ</p>
        <p>Հեռ․ +374 00 00 00 00</p>
      </Footer>

      <CartButton onClick={() => setCartOpen(true)}>
        🛒
        {cartProductsCount > 0 && <CartCount>{cartProductsCount}</CartCount>}
      </CartButton>

      {cartOpen && (
        <ModalOverlay>
          <CartBox>
            <CloseButton onClick={() => setCartOpen(false)}>×</CloseButton>

            <ModalTitle>Ձեր զամբյուղը</ModalTitle>

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

                      <div>
                        <button onClick={() => addToCart(item)}>+</button>
                        <button onClick={() => minusFromCart(item.id)}>−</button>
                        <button onClick={() => deleteFromCart(item.id)}>×</button>
                      </div>
                    </CartItem>
                  ))}
                </CartItems>

                <h3
                  style={{
                    color: "#f5d77b",
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

            <ModalTitle>Պատվիրել տոնածառ</ModalTitle>
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
                <option value="" disabled>
                  Ընտրել վճարման տարբերակը
                </option>
                <option value="cash">Վճարում առաքման պահին</option>
                <option value="card">Քարտով վճարում</option>
              </ModalSelect>

              {form.payment === "card" && (
                <ModalText>
                  Քարտով վճարելու դեպքում Դուք կտեղափոխվեք բանկի կամ վճարային
                  համակարգի ապահով էջ։ Քարտի տվյալները մեր կայքում չեն լրացվում։
                </ModalText>
              )}

              <ModalText>Պատվերի ընդհանուր գումար՝ {totalPrice} դրամ</ModalText>

              <ModalButtons>
                <Button $small type="submit">
                  {form.payment === "card"
                    ? "Գրանցել պատվերը և անցնել վճարման"
                    : "Ուղարկել պատվեր"}
                </Button>

                <Button $small type="button" onClick={() => setOrderOpen(false)}>
                  Փակել
                </Button>
              </ModalButtons>
            </ModalForm>
          </ModalBox>
        </ModalOverlay>
      )}

      {success && (
        <SuccessBox>
          Մեր առաքիչը հնարավորինս շուտ կմոտենա Ձեզ ✅
        </SuccessBox>
      )}
    </Page>
  );
}

export default Tonacarner;