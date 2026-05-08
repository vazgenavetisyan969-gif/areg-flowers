import styled from "styled-components";

export const MenuWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 320px;
  margin-top: 10px;
  border-radius: 24px;
  background-color: black;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  a{
    text-decoration: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 15px;
    background: transparent;
  }
`;

export const MenuItem = styled.p`
  margin: 0 0 0px 0;
  padding: 16px 20px;

  border-radius: 18px;
  color: #2d2d2d;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: 0.25s ease;
  

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #ebe5f5;
    transform: translateX(4px);
  }
`;

