import type { Post, Site } from '@prisma/client'
import type { PropsWithChildren } from 'react'

export type WithChildren<T = {}> = T & PropsWithChildren<{}>

export type WithClassName<T = {}> = T & {
  className?: string
}

export interface WithSitePost extends Post {
  site: Site | null
}

export type urlKeys = 'home' | 'plans' | 'examples' | 'support' | 'faq' | 'docs'

export type navigation = {
  key: urlKeys
}
