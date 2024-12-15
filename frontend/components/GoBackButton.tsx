"use client";

import React from 'react'

const GoBackButton = () => {
  return (
    <div>
        <button
type="button"
onClick={() => window.history.back()}
style={{
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'solid black',
    borderRadius: '5px',
    cursor: 'pointer'
}}
>
Go to blogs
</button>
    </div>
  )
}

export default GoBackButton