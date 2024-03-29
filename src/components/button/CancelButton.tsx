import { ICustomButtonProps } from '~/global/interfaces/interface'
import CustomButton from './CustomButton'

const CancelButton = (props: ICustomButtonProps) => {
  const { name, onClick, icon, sx, disable, type } = props
  return (
    <>
      <CustomButton
        variant='contained'
        name={name}
        type={type}
        icon={icon}
        sx={{
          textTransform: 'uppercase',
          fontSize: '14px',
          margin: '10px',
          padding: '10px',
          lineHeight: '1.2',
          color: 'var(--red-color)',
          backgroundColor: 'var(--red-light-color)',
          '&:hover': {
            backgroundColor: 'var(--red-color)',
            color: 'var(--white-color)'
          },
          '&:focus': {
            outline: 'none'
          },
          ...sx
        }}
        onClick={onClick}
        disable={disable}
      />
    </>
  )
}

export default CancelButton
