import { array, lazy, number, object, string } from 'yup'

const variantSchema = object().shape({
  sku: string().required('SKU là bắt buộc'),
  price: number()
    .typeError('Giá phải là số')
    .positive('Giá phải lớn hơn 0')
    .max(999999999, 'Giá không được vượt quá 999.999.999')
    .required('Giá là bắt buộc'),
  quantity: number()
    .typeError('Số lượng phải là số')
    .positive('Số lượng phải lớn hơn 0')
    .required('Số lượng là bắt buộc'),
  dimensions: object()
    .shape({
      length: number().typeError('Chiều dài phải là số').positive('Chiều dài phải lớn hơn 0').required(),
      height: number().typeError('Chiều cao phải là số').positive('Chiều cao phải lớn hơn 0').required(),
      width: number().typeError('Chiều rộng phải là số').positive('Chiều rộng phải lớn hơn 0').required()
    })
    .required(),
  keyValue: lazy((obj) =>
    object().shape(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
        acc[key] = object().shape({
          key: string().trim().required('Thuộc tính là bắt buộc'),
          value: string().trim().required('Giá trị của thuộc tính là bắt buộc')
        })
        return acc
      }, {})
    )
  )
})

export const addProductValidationSchema = object().shape({
  name: string().trim().required('Tên sản phẩm là bắt buộc'),
  description: string().trim().required('Mô tả là bắt buộc'),
  images: array().of(string().required()).required('Cần có ít nhất 1 ảnh'),
  brand: string().trim().required('Thương hiệu là bắt buộc'),
  variants: array().of(variantSchema).required('Phân loại là bắt buộc'),
  categories: array().required('Vui lòng chọn 1 danh mục cho sản phẩm')
})
