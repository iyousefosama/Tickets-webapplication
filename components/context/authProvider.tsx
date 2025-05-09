"use client";

import React from 'react'
import { SessionProvider } from 'next-auth/react'

const authProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default authProvider