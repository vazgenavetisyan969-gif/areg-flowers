import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at top left, rgba(255, 192, 203, 0.35), transparent 35%),
    radial-gradient(circle at bottom right, rgba(255, 228, 235, 0.6), transparent 35%),
    linear-gradient(135deg, #fff7fb, #ffffff, #fff1f7);
  color: #2b1523;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const Header = styled.header`
  width: 100%;
  padding: 18px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 50;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(184, 50, 128, 0.12);

  @media (max-width: 768px) {
    padding: 10px 14px;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 26px;
  font-weight: 900;
  color: #b83280;

  img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    background: #f5f5f5;
    border-radius: 50%;
    border: 1px solid rgba(184, 50, 128, 0.15);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 21px;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 28px;

  a {
    color: #2b1523;
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    transition: 0.25s;
  }

  a:hover {
    color: #b83280;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 6px;
    justify-content: space-between;

    a {
      flex: 1;
      text-align: center;
      font-size: 12.5px;
      padding: 7px 6px;
      border-radius: 999px;
      background: #fff0f7;
      white-space: nowrap;
    }
  }
`;

export const Hero = styled.section`
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 70px;
  gap: 50px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    padding: 36px 24px;
    flex-direction: column;
    text-align: center;
    min-height: auto;
    gap: 28px;
  }

  @media (max-width: 480px) {
    padding: 26px 16px 24px;
    gap: 22px;
  }
`;

export const HeroText = styled.div`
  max-width: 630px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 62px;
  line-height: 1.08;
  margin: 0 0 20px;
  color: #2b1523;

  @media (max-width: 768px) {
    font-size: 34px;
    line-height: 1.18;
    margin-bottom: 14px;
  }

  @media (max-width: 400px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.65;
  color: #6f5264;
  margin: 0 0 30px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.55;
    margin-bottom: 22px;
  }
`;

export const Button = styled.button`
  padding: ${({ $small }) => ($small ? "12px 24px" : "16px 34px")};
  border: none;
  border-radius: 40px;
  background: linear-gradient(135deg, #ff8ab3, #e05297, #b83280);
  color: white;
  font-size: ${({ $small }) => ($small ? "15px" : "17px")};
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(184, 50, 128, 0.24);
  transition: 0.25s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(184, 50, 128, 0.32);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: ${({ $small }) => ($small ? "100%" : "100%")};
    max-width: ${({ $small }) => ($small ? "none" : "300px")};
    padding: ${({ $small }) => ($small ? "12px 18px" : "14px 22px")};
    font-size: ${({ $small }) => ($small ? "14px" : "15.5px")};
  }
`;

export const HeroCard = styled.div`
  width: 450px;
  height: 450px;
  border-radius: 38px;
  background: #f5f5f5;
  border: 1px solid rgba(184, 50, 128, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 24px 65px rgba(184, 50, 128, 0.16);
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 310px;
    height: 310px;
    border-radius: 28px;
    padding: 12px;
  }

  @media (max-width: 380px) {
    max-width: 270px;
    height: 270px;
  }
`;

export const FlowerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 26px;

  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

export const Section = styled.section`
  padding: 70px 70px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

export const SmallSection = styled.section`
  padding: 40px 70px 60px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 16px 44px;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 40px;
  margin: 0 0 40px;
  color: #b83280;

  @media (max-width: 768px) {
    font-size: 27px;
    margin-bottom: 24px;
  }
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 26px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(184, 50, 128, 0.12);
  box-shadow: 0 12px 35px rgba(184, 50, 128, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.25s;

  &:hover {
    transform: translateY(-6px);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 22px;

    &:hover {
      transform: none;
    }
  }
`;

export const CardImg = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    height: 210px;
    border-radius: 16px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 22px;
  color: #b83280;
  margin: 0 0 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CardText = styled.p`
  color: #6f5264;
  font-size: 14.5px;
  line-height: 1.55;
  margin: 0 0 14px;
`;

export const AboutCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  max-width: 980px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const Price = styled.h4`
  color: #2b1523;
  font-size: 20px;
  margin: 0 0 14px;
`;

export const MoreControls = styled.div`
  max-width: 850px;
  margin: 40px auto 0;
  padding: 24px;
  border-radius: 28px;
  text-align: center;
  background: white;
  border: 1px solid rgba(184, 50, 128, 0.14);
  box-shadow: 0 16px 45px rgba(184, 50, 128, 0.1);

  h3 {
    color: #b83280;
    font-size: 26px;
    margin: 0 0 8px;
  }

  p {
    color: #6f5264;
    margin: 0 0 18px;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    padding: 18px 14px;
    border-radius: 22px;
    margin-top: 28px;

    h3 {
      font-size: 21px;
    }

    p {
      font-size: 13.5px;
    }

    div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }
`;

export const MoreButton = styled.button`
  border-radius: 999px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 800;
  color: ${({ $active }) => ($active ? "white" : "#b83280")};
  background: ${({ $active }) => ($active ? "#b83280" : "#fff0f7")};
  border: 1px solid rgba(184, 50, 128, 0.18);
  transition: 0.25s;

  &:hover {
    background: #b83280;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 11px 10px;
    font-size: 13px;
  }
`;

export const MoreBox = styled.div`
  margin-top: 44px;

  @media (max-width: 768px) {
    margin-top: 28px;
  }
`;

export const Footer = styled.footer`
  padding: 46px 70px 95px;
  text-align: center;
  background: #fff0f7;
  border-top: 1px solid rgba(184, 50, 128, 0.12);

  h2 {
    color: #b83280;
    font-size: 32px;
    margin: 0 0 10px;
  }

  p {
    color: #6f5264;
    font-size: 16px;
    margin: 6px 0;
  }

  @media (max-width: 768px) {
    padding: 32px 16px 95px;

    h2 {
      font-size: 26px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(43, 21, 35, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-end;
  }
`;

export const ModalBox = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 30px;
  padding: 34px;
  position: relative;
  box-shadow: 0 30px 90px rgba(184, 50, 128, 0.25);
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 28px 16px 26px;
    border-radius: 26px 26px 0 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: #fff0f7;
  color: #b83280;
  font-size: 26px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;

  &:hover {
    background: #b83280;
    color: white;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 28px;
  color: #b83280;
  text-align: center;
  margin: 0 0 8px;

  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

export const ModalText = styled.p`
  font-size: 15px;
  color: #6f5264;
  text-align: center;
  line-height: 1.55;
  margin: 0 0 16px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ModalInput = styled.input`
  height: 50px;
  border-radius: 16px;
  border: 1px solid rgba(184, 50, 128, 0.2);
  background: #fff8fb;
  color: #2b1523;
  font-size: 16px;
  padding: 0 16px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #9b7b8d;
  }

  &:focus {
    border-color: #b83280;
    box-shadow: 0 0 0 3px rgba(184, 50, 128, 0.1);
  }
`;

export const ModalSelect = styled.select`
  height: 50px;
  border-radius: 16px;
  border: 1px solid rgba(184, 50, 128, 0.2);
  background: #fff8fb;
  color: #2b1523;
  font-size: 16px;
  padding: 0 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #b83280;
    box-shadow: 0 0 0 3px rgba(184, 50, 128, 0.1);
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const PlusButton = styled.button`
  position: absolute;
  top: 26px;
  right: 26px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: #b83280;
  color: white;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);

  &:hover {
    transform: scale(1.08);
    background: #8f1f60;
  }
`;

export const CartButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 68px;
  height: 68px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8ab3, #e05297, #b83280);
  color: white;
  font-size: 28px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 14px 36px rgba(184, 50, 128, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;

  &:hover {
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
    width: 58px;
    height: 58px;
    font-size: 24px;
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff477e;
  color: white;
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

export const CartBox = styled.div`
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  overflow-y: auto;
  background: white;
  border-radius: 30px;
  padding: 30px;
  position: relative;
  box-shadow: 0 30px 90px rgba(184, 50, 128, 0.25);
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 88vh;
    padding: 24px 14px 26px;
    border-radius: 26px 26px 0 0;
  }
`;

export const CartHeader = styled.div`
  margin-bottom: 20px;
  padding-right: 40px;
`;

export const CartLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    background: #f5f5f5;
    border-radius: 50%;
    flex-shrink: 0;
  }

  span {
    display: block;
    color: #b83280;
    font-size: 21px;
    font-weight: 900;
  }

  small {
    color: #6f5264;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }

    span {
      font-size: 18px;
    }
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 22px;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 76px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 18px;
  background: #fff8fb;
  border: 1px solid rgba(184, 50, 128, 0.12);

  img {
    width: 76px;
    height: 70px;
    object-fit: cover;
    border-radius: 12px;
  }

  h4 {
    color: #b83280;
    margin: 0 0 4px;
    font-size: 16px;
  }

  p {
    color: #6f5264;
    margin: 2px 0;
    font-size: 13px;
    font-weight: 600;
  }

  @media (max-width: 520px) {
    grid-template-columns: 64px 1fr;
    gap: 10px;
    padding: 10px;

    img {
      width: 64px;
      height: 64px;
    }

    h4 {
      font-size: 15px;
    }

    p {
      font-size: 12px;
    }
  }
`;

export const CartActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 520px) {
    grid-column: 1 / -1;
    justify-content: flex-end;
    padding-top: 6px;
    border-top: 1px dashed rgba(184, 50, 128, 0.15);
  }
`;

export const RoundActionButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #b83280;
  color: white;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;

  &:hover {
    background: #8f1f60;
  }
`;

export const DeleteActionButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #ff477e;
  color: white;
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;

  &:hover {
    background: #d91f5c;
  }
`;

export const SuccessBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  background: #b83280;
  color: white;
  padding: 14px 26px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 800;
  z-index: 1200;
  box-shadow: 0 14px 36px rgba(184, 50, 128, 0.28);
  white-space: nowrap;

  @media (max-width: 768px) {
    bottom: 84px;
    padding: 12px 20px;
    font-size: 14px;
  }
`;