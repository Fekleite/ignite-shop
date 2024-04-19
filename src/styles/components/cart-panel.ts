import { styled } from "..";

export const PanelContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  
  minHeight: '100vh',
  
  padding: 48,
  width: 480,

  backgroundColor: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

  position: 'fixed',
  top: 0,
  right: 0,

  footer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    gap: 56,

    button: {
      marginTop: 'auto',
      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      }
    }
  }
})

export const CloseButton = styled('button', {
  backgroundColor: "transparent",
  border: 0,
  padding: 0,
  marginLeft: 'auto',
  color: '$gray300',

  cursor: 'pointer'
})

export const CartProductList = styled('div', {
  width: '100%',
  flex: 1,
  marginTop: 24,
  marginBottom: 24,

  h3: {
    fontSize: 20,
  },
})

export const ScrollableArea = styled('div', {
  width: '100%',
  maxHeight: 400,
  overflow: 'auto',

  marginTop: 32,
  marginBottom: 32,

  display: 'flex',
  flexDirection: 'column',
  gap: 32
})

export const CartItem = styled('div', {
  width: '100%',

  display: 'flex',
  gap: 20,

  span: {
    fontSize: 18,
    color: '$gray300',
    lineHeight: '160%',

    display: 'block'
  },

  strong: {
    fontSize: 18,
    lineHeight: '160%',
    fontWeight: 'bold'
  },

  button: {
    display: 'block',

    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    marginTop: 8,

    fontWeight: 'bold',
    color: '$green500',

    cursor: 'pointer'
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 94,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const CartResume = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      color: '$gray300'
    },

    strong:  {
      fontSize: 18,

      '&:last-of-type': {
        fontSize: 24
      },
    }
  }
})