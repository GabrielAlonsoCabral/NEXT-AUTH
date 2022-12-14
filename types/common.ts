import type { Post, Site } from '@prisma/client'
import type { PropsWithChildren } from 'react'

export type WithChildren<T = {}> = T & PropsWithChildren<{}>

export type WithClassName<T = {}> = T & {
  className?: string
}

export interface WithSitePost extends Post {
  site: Site | null
}

export type urlKeys = 'home' | 'offers' | 'examples' | 'doubts' | 'support'

export type navigation = {
  key: urlKeys
}
