'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './button'
import { motion } from 'framer-motion'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='w-full md:w-auto justify-start relative'
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: theme === 'light' ? 1 : 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
        className='absolute'
      >
        <Moon className='h-5 w-5' />
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: theme === 'dark' ? 1 : 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
        className='absolute'
      >
        <Sun className='h-5 w-5' />
      </motion.div>
      <div className='w-5' /> {/* Spacer để giữ layout */}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='ml-2 md:hidden'>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </motion.span>
    </Button>
  )
}
