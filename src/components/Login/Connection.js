import React from 'react'

export default function Connection({ status }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          margin: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: status ? 'green' : 'red',
            borderRadius: 50,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 3,
        }}
      >
        {status ? 'Connected' : 'Disconnected '}
      </div>
    </div>
  )
}
