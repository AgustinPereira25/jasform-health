import React from 'react'
import { JASFormLogo } from './Logo'

const HomeTextAndImage: React.FC = () => {
  return (
      <div className='p-6'>
        <JASFormLogo className="mb-3 h-24 w-auto" />
        <span className="mt-10 text-center text-5xl font-light leading-9 tracking-tight text-white leading-[60px]">
          Create awesome <br /> forms easily,<br />
          <strong>but HIPAA Compliant!</strong>
        </span>
      </div>
  )
}

export default HomeTextAndImage