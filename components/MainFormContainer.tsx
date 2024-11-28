import React from 'react'

const MainFormContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-6 xl:flex-row'>
      {children}
    </div>
  )
}

export default MainFormContainer
