import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 215, 120, 0.25), transparent 35%),
    linear-gradient(135deg, #061b12, #0d2f20, #08140f);
  color: white;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
`;

export const Header = styled.header`
  width: 100%;
  padding: 22px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 18px 30px;
    flex-direction: column;
    gap: 18px;
  }

  @media (max-width: 650px) {
    padding: 16px 18px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 28px;
  font-weight: 800;
  color: #f5d77b;

  img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    border-radius: 50%;
  }

  @media (max-width: 650px) {
    font-size: 23px;

    img {
      width: 48px;
      height: 48px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 34px;

  a {
    color: white;
    text-decoration: none;
    font-size: 17px;
    transition: 0.3s;
  }

  a:hover {
    color: #f5d77b;
  }

  @media (max-width: 1000px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  @media (max-width: 650px) {
    gap: 14px;

    a {
      font-size: 15px;
    }
  }
`;

export const Hero = styled.section`
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 70px;
  gap: 60px;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 50px 30px;
    text-align: center;
  }

  @media (max-width: 650px) {
    padding: 40px 18px;
  }
`;

export const HeroText = styled.div`
  max-width: 620px;
`;

export const Title = styled.h1`
  font-size: 72px;
  line-height: 1.05;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #ffffff, #f5d77b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1000px) {
    font-size: 48px;
  }

  @media (max-width: 650px) {
    font-size: 38px;
  }
`;

export const Subtitle = styled.p`
  font-size: 22px;
  line-height: 1.7;
  color: #e8e8e8;
  margin-bottom: 35px;

  @media (max-width: 1000px) {
    font-size: 19px;
  }

  @media (max-width: 650px) {
    font-size: 17px;
  }
`;

export const Button = styled.button`
  padding: ${({ $small }) => ($small ? "13px 28px" : "18px 38px")};
  border: none;
  border-radius: 40px;
  background: linear-gradient(135deg, #d4af37, #fff1a8, #c79524);
  color: #092014;
  font-size: ${({ $small }) => ($small ? "16px" : "19px")};
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 35px rgba(212, 175, 55, 0.35);
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 18px 45px rgba(212, 175, 55, 0.48);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const HeroCard = styled.div`
  width: 480px;
  height: 560px;
  border-radius: 42px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);

  @media (max-width: 1000px) {
    width: 100%;
    max-width: 430px;
    height: 430px;
  }

  @media (max-width: 650px) {
    height: 360px;
  }
`;

export const TreeImg = styled.img`
  width: 85%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.5));
`;

export const Section = styled.section`
  padding: 80px 70px;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 60px 30px;
  }

  @media (max-width: 650px) {
    padding: 50px 18px;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 46px;
  margin-bottom: 45px;
  color: #f5d77b;

  @media (max-width: 650px) {
    font-size: 34px;
  }
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  position: relative;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 24px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: 0.3s;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.22);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    border-color: rgba(245, 215, 123, 0.45);
  }
`;

export const CardImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 22px;
  margin-bottom: 20px;

  @media (max-width: 650px) {
    height: 230px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 26px;
  color: #fff1a8;
  margin-bottom: 12px;
`;

export const CardText = styled.p`
  color: #e8e8e8;
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 18px;
`;

export const Price = styled.h4`
  color: #f5d77b;
  font-size: 24px;
  margin-bottom: 18px;
`;

export const MoreBox = styled.div`
  margin-top: 60px;
  animation: openCards 0.5s ease;

  ${SectionTitle} {
    font-size: 40px;
    margin-bottom: 35px;
  }

  @keyframes openCards {
    from {
      opacity: 0;
      transform: translateY(35px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 650px) {
    ${SectionTitle} {
      font-size: 32px;
    }
  }
`;

export const Footer = styled.footer`
  padding: 50px 70px;
  text-align: center;
  background: rgba(0, 0, 0, 0.35);

  h2 {
    color: #f5d77b;
    font-size: 36px;
    margin-bottom: 12px;
  }

  p {
    color: #ddd;
    font-size: 18px;
    margin: 7px 0;
  }

  @media (max-width: 650px) {
    padding: 40px 20px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
  box-sizing: border-box;
`;

export const ModalBox = styled.div`
  width: 100%;
  max-width: 520px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06)),
    #0b2418;
  border: 1px solid rgba(245, 215, 123, 0.35);
  border-radius: 32px;
  padding: 38px;
  position: relative;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
  animation: modalOpen 0.35s ease;
  box-sizing: border-box;

  @keyframes modalOpen {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 650px) {
    padding: 30px 20px;
    border-radius: 24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 18px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  color: #fff1a8;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgba(245, 215, 123, 0.25);
    transform: rotate(90deg);
  }
`;

export const ModalTitle = styled.h2`
  font-size: 34px;
  color: #f5d77b;
  margin-bottom: 12px;
  text-align: center;
`;

export const ModalText = styled.p`
  font-size: 17px;
  color: #e8e8e8;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 26px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: 18px;
  border: 1px solid rgba(245, 215, 123, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  padding: 0 18px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.65);
  }

  &:focus {
    border-color: #f5d77b;
    box-shadow: 0 0 0 4px rgba(245, 215, 123, 0.12);
  }
`;

export const ModalSelect = styled.select`
  width: 100%;
  height: 54px;
  border-radius: 18px;
  border: 1px solid rgba(245, 215, 123, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  padding: 0 18px;
  outline: none;
  box-sizing: border-box;

  option {
    color: #092014;
  }

  &:focus {
    border-color: #f5d77b;
    box-shadow: 0 0 0 4px rgba(245, 215, 123, 0.12);
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 8px;
  flex-wrap: wrap;
`;
export const PlusButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #fff1a8, #c79524);
  color: #092014;
  font-size: 28px;
  font-weight: 900;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 10px 28px rgba(212, 175, 55, 0.35);
  transition: 0.3s;

  &:hover {
    transform: scale(1.12) rotate(90deg);
  }
`;

export const CartButton = styled.button`
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #fff1a8, #c79524);
  color: #092014;
  font-size: 30px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
`;

export const CartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ff3131;
  color: white;
  font-size: 14px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CartBox = styled.div`
  width: 100%;
  max-width: 620px;
  max-height: 85vh;
  overflow-y: auto;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06)),
    #0b2418;
  border: 1px solid rgba(245, 215, 123, 0.35);
  border-radius: 32px;
  padding: 38px;
  position: relative;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
  box-sizing: border-box;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 26px;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 82px 1fr 36px;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.09);

  img {
    width: 82px;
    height: 72px;
    object-fit: cover;
    border-radius: 14px;
  }

  h4 {
    color: #fff1a8;
    font-size: 18px;
    margin: 0 0 6px;
  }

  p {
    color: #f5d77b;
    margin: 0;
    font-weight: 700;
  }

  button {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 70, 70, 0.22);
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
`;

export const SuccessBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: 35px;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #d4af37, #fff1a8, #c79524);
  color: #092014;
  padding: 18px 30px;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 900;
  z-index: 1200;
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.45);
  text-align: center;
`;