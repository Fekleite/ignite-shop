import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: "center"
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    backgroundColor:'$gray800',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '0.75rem',
    cursor: 'pointer',

    position: 'relative',

    span: {
      position: 'absolute',
      top: -7,
      right: -7,
      
      width: 27,
      height: 27,
      backgroundColor: '$green500',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '$gray900'
    }
  },
})