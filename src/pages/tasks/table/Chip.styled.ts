import styled from 'styled-components'
import { ITaskStatusProps } from '~/global/interfaces/tasksInterface'

export const StatusDiv = styled.div<ITaskStatusProps>`
  width: fit-content;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px 15px;
  font-weight: 500;
  ${({ success }) =>
    success &&
    `
    background-color: var(--primary-light-color);
    color: var(--primary-color)
  `}
  ${({ warning }) =>
    warning &&
    `
    background-color: var(--green-light-color);
    color: var(--green-color)
  `}
  ${({ danger }) =>
    danger &&
    `
    background-color: var(--red-light-color);
    color: var(--red-color)
  `}
   ${({ secondary }) =>
    secondary &&
    `
    background-color: var(--cyan-light-color);
    color: var(--cyan-color)
  `}
   ${({ primary }) =>
    primary &&
    `
    background-color: var(--cyan-light-color);
    color: var(--cyan-color)
  `}
`
