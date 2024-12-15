import { Trash2 } from 'lucide-react'
import React from 'react'

const TrashIcon = ({onDelete}: {onDelete: () => void}) => {
  return (
    <Trash2 className='cursor-pointer opacity-[0.3] hover:opacity-[0.5]' onClick={onDelete}/>
  )
}

export default TrashIcon