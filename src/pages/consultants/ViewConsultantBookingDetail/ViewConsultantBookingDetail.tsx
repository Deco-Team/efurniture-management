import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SecondaryButton from '~/components/button/SecondaryButton'
import Loading from '~/components/loading/Loading'
import { ScreenPath } from '~/global/enum'
import { notifyError } from '~/global/toastify'
import { ButtonWrapper } from '~/pages/categories/addCategory/AddCategory.styled'
import {
  InformationContainer,
  TextLeft,
  TextRight,
  TextWrapper,
  TitleText,
  Wrapper
} from './ViewConsultantBookingDetail.styled'
import dayjs from 'dayjs'
import useConsultBookingsApi from '~/hooks/api/useConsultantBookingsApi'
import { IConsultantBookingsProps } from '~/global/interfaces/consultantBookingsInterface'
import { TextHeader } from '~/pages/orders/viewOrder/ViewOrderDetail.styled'
import { EMPTY } from '~/global/constants/constants'
import Chip from '~/components/chip/Chip'

const ViewConsultantBookingDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { getConsultantBookingById } = useConsultBookingsApi()
  const [consultantBookingData, setConsultantBookingData] = useState<IConsultantBookingsProps>()
  const [isLoading, setIsLoading] = useState(false)
  const consultantBookingId = params.consultantBookingId

  useEffect(() => {
    if (consultantBookingId) {
      getConsultantBookingDetail(consultantBookingId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getConsultantBookingDetail = async (consultantBookingId: string) => {
    setIsLoading(true)
    try {
      const data = await getConsultantBookingById(consultantBookingId)
      setConsultantBookingData(data)
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }
  const handleBackButton = () => {
    navigate(ScreenPath.CONSULTANT_BOOKING)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <ButtonWrapper>
        <SecondaryButton
          variant='contained'
          name='Trở về'
          color='var(--gray-light-color)'
          icon={<ArrowBackIcon />}
          onClick={handleBackButton}
          type='button'
        />
      </ButtonWrapper>
      <Wrapper>
        <InformationContainer>
          <TitleText>Thông tin đặt tư vấn thiết kế</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Ngày đặt:</strong>
            </TextHeader>
            {dayjs(consultantBookingData?.bookingDate).format('hh:mm DD/MM/YYYY')}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Trạng thái:</strong>
            </TextHeader>
            <Chip status={consultantBookingData?.bookingStatus || EMPTY} />
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Phân loại quan tâm:</strong>
            </TextHeader>
            <TextRight>{consultantBookingData?.interestedCategories?.map((cate) => cate.name).join(', ')}</TextRight>
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Nhân viên tư vấn</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Họ và tên:</strong>
            </TextHeader>
            {`${consultantBookingData?.consultant.lastName} ${consultantBookingData?.consultant.firstName}`}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Mã nhân viên:</strong>
            </TextHeader>
            {consultantBookingData?.consultant.staffCode}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Email:</strong>
            </TextHeader>
            {consultantBookingData?.consultant.email}
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Khách hàng</TitleText>
          <TextWrapper>
            <TextHeader>
              <strong>Họ và tên:</strong>
            </TextHeader>
            {`${consultantBookingData?.customer.lastName} ${consultantBookingData?.customer.firstName}`}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Email:</strong>
            </TextHeader>
            {consultantBookingData?.customer.email}
          </TextWrapper>
          <TextWrapper>
            <TextHeader>
              <strong>Điện thoại:</strong>
            </TextHeader>
            {consultantBookingData?.customer.phone}
          </TextWrapper>
        </InformationContainer>
        <InformationContainer>
          <TitleText>Lưu ý</TitleText>
          <TextWrapper>
            <TextLeft>{consultantBookingData?.notes}</TextLeft>
          </TextWrapper>
        </InformationContainer>
      </Wrapper>
    </>
  )
}

export default ViewConsultantBookingDetail
