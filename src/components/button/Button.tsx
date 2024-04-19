import { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
  type?: 'primary' | 'secondary'
  onClick?: () => void;
}

export const Button = ({ onClick, children, type = 'primary' }: IProps) => {
  let classnames = ''
  switch (type) {
    case 'primary':
      classnames += ' text-white bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700'
      break
    case 'secondary':
      classnames += ' text-blue-500 font-bold border-blue-500 hover:border-blue-600 hover:text-blue-600'
      break
    default:
      break
  }

  return (
    <button
      className={`${classnames}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}