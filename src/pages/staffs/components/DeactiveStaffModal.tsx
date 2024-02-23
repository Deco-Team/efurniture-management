import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CancelButton from '~/components/button/CancelButton'
import SecondaryButton from '~/components/button/SecondaryButton'
import { ScreenPath } from '~/global/enum'
import { DeactiveStaffModalProps } from '~/global/interfaces/staffsInterface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useStaffsApi from '~/hooks/api/useStaffsApi'

const DeactiveStaffModal = ({ staffId, handleClose, open }: DeactiveStaffModalProps) => {
  const { deactiveStaff } = useStaffsApi()
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }
  const handleDisableStaffButton = async (staffId: string) => {
    try {
      deactiveStaff(staffId)
      notifySuccess('Vô hiệu hóa nhân viên thành công')
      navigate(ScreenPath.STAFFS)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      handleClose()
    }
  }
  const handleBackButton = () => {
    handleClose()
  }
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id='transition-modal-title' variant='h6' component='h2' sx={{ marginBottom: '20px' }}>
            Bạn có chắc chắn muốn vô hiệu hóa nhân viên này?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SecondaryButton
              variant='contained'
              name='Hủy'
              color='var(--gray-light-color)'
              onClick={handleBackButton}
              type='button'
            />
            <CancelButton
              variant='outlined'
              name='Đồng ý'
              type='button'
              onClick={() => handleDisableStaffButton(staffId)}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeactiveStaffModal
