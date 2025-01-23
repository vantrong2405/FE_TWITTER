import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 200 ký tự')
    .max(200, 'Độ dài từ 5 - 200 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 200 ký tự')
    .max(200, 'Độ dài từ 6 - 200 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 200 ký tự')
    .max(200, 'Độ dài từ 6 - 200 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc'),
  date_of_birth: yup.string().trim().required('Ngày sinh là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(200, 'Độ dài tối đa là 200 ký tự').required('Tên là bắt buộc'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự').required('Số điện thoại là bắt buộc'),
  address: yup.string().max(200, 'Độ dài tối đa là 200 ký tự').required('Địa chỉ là bắt buộc'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự').required('Avatar là bắt buộc'),
  date_of_birth: yup.string().trim(),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  cover_photo: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự').required('Ảnh bìa là bắt buộc'),
  confirm_password: schema.fields['confirm_password'],
  bio: yup.string().max(200, 'Độ dài tối đa là 200 ký tự').required('Bio là bắt buộc'),
  website: yup.string().max(200, 'Độ dài tối đa là 200 ký tự').required('Website là bắt buộc'),
  location: yup
    .string()
    .oneOf(['Hà nội', 'Đà nẵng', 'Hồ chí minh'], 'Địa điểm không hợp lệ')
    .max(200, 'Độ dài tối đa là 200 ký tự')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type TypeSchema = yup.InferType<typeof schema>
