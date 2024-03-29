/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { IRadioGroupProps } from '~/global/interfaces/interface'

const InputRadioForm = ({ label, options, defaultValue, sx, onChange, disabled }: IRadioGroupProps) => {
  const initialValue = defaultValue || options[0]?.value
  return (
    <FormControl component='fieldset' sx={sx}>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup value={initialValue} onChange={onChange} sx={{ flexDirection: 'row' }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio />}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default InputRadioForm
