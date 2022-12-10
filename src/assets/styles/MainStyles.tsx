import styled, {css, keyframes} from "styled-components";
import React from "react";

export const Episode = styled(props => <div {...props} />)`
  & + & {
    border-top: 1px solid #3f3f3f;
  }
`

export const FeaturedContainer = styled(props => <div {...props} />)`
  background-size: auto 100%;
  background: linear-gradient(90deg, #141414 30%, transparent 70%),
  linear-gradient(0deg, #141414 1%, transparent 99%),
  url(${props => props.background}) no-repeat;

  @media (min-width: 550px) {
    height: 100vh;
    line-height: 1.5;
    background: linear-gradient(90deg, #141414 30%, transparent 70%),
    linear-gradient(0deg, #141414 1%, transparent 99%),
    url(${props => props.background}) no-repeat;
    background-size: cover;
  }
`

export const moveLeft = keyframes`
  from {
    width: clamp(2rem, 2vw, 4rem);
  }

  to {
    width: clamp(12rem, 15vw, 25rem);
  }
`

export const hide = keyframes`
  from {
    width: clamp(12rem, 15vw, 25rem);
  }

  to {
    width: clamp(2rem, 2vw, 4rem);
  }
`

// eslint-disable-next-line react/display-name
const _searchBarContainer = React.forwardRef<any>((props, ref) => <div {...props} ref={ref}/>)

export const SearchBarContainer: any = styled(_searchBarContainer)`
  width: clamp(2rem, 1vw, 2rem);
  height: clamp(2rem, 2vw, 5rem);
  position: relative;
  overflow: hidden;
  ${props => (props as any).show && css`
    animation: ${moveLeft} 300ms forwards;
  `}
  ${props => !(props as any).show && css`
    animation-direction: reverse;
    animation: ${hide} 300ms forwards;
  `}
`

export const CarrouselContainer = styled.div`
  width: 100%;
  overflow: clip;
  position: relative;
`

export const CarrouselButton = styled(props => <button {...props} />)`
  width: 3.5vw;
  height: 100%;
  cursor: pointer;
  position: absolute;
  color: white;
  opacity: 0;
  transform: scaleY(.9);
  background: rgba(0, 0, 0, .5);
  transition: opacity ease 200ms;
  ${props => props.position === 'left' && css`
    left: 0;
  `}
  ${props => props.position === 'right' && css`
    right: 0;
  `}
  ${CarrouselContainer}:hover & {
    opacity: 1;
  }
  @media (max-width: 800px) {
    display: none;
  }
`


export const SelectStyles = {
    control: (base, state) => ({
        ...base,
        background: '#141414',
        color: '#000',
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        borderColor: '#141414',
        boxShadow: null,
        "&:hover": {
            borderColor: '#141414'
        }
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        width: 'auto',
        marginLeft: '-1vw',
    }),
    menuList: (base) => ({
        ...base,
        padding: 0
    }),
    option: (base, state) => ({
        ...base,
        color: '#fff',
        cursor: 'pointer',
        backgroundColor: state.isSelected ? '#333131' : '#1e1d1d',

    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#fff',
        '&:hover': {
            color: '#A020F0',
        },
        cursor: 'pointer',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#fff',
        '&:hover': {
            color: '#A020F0',
        },
        cursor: 'pointer',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#c5c5c5',
    }),
    input: (base) => ({
        ...base,
        color: '#fff'
    }),
    noOptionsMessage: (base) => ({
        ...base,
        color: '#fff',
        background: '#1e1d1d'
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#A020F0',
        color: '#fff',
        borderRadius: '0.4rem',
        padding: '0.2rem 0.4rem',
        margin: '0.2rem 0.2rem',
        cursor: 'pointer',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: '#FFF',
    }),
};