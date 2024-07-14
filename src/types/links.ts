export type CreateLinkResponse = {
  linkId: string // UUID é uma string
}

export type Link = {
  id: string
  title: string
  url: string
}

export type LinksAPIResponse = {
  links: Link[]
}
