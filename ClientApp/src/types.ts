import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number
}

export type CountryType = {
  id: number | undefined
  userId: number | undefined
  dateAdded: Date
  name: string
  flagUrl: string
  recipes: RecipeType[]
  movies: MovieType[]
  musics: MovieType[]
}

export type MovieType = {
  id: number | undefined
  dateAdded: Date
  title: string
  description: string
  url: string
  photoUrl: string
  countryId: number
}

export type MusicType = {
  id: number | undefined
  dateAdded: Date
  artist: string
  description: string
  url: string
  photoUrl: string
  countryId: number
}

export type RecipeType = {
  id: number | undefined
  dateAdded: Date
  name: string
  url: string
  photoUrl: string
  description: string
  countryId: number | undefined
}

export type APIError = {
  errors: Record<string, string[]>
  status: number
  title: string
  traceId: string
  type: string
}

export type NewUserType = {
  firstName: string
  email: string
  password: string
  photoUrl: string
}

export type LoginUserType = {
  id: number | undefined
  email: string
  firstName: string
  password: string
  photoUrl: string
  countries: CountryType[]
}

export type LoginSuccess = {
  token: string
  user: {
    id: number
    firstName: string
    email: string
    photoUrl: string
    countries: CountryType[]
  }
}

// export type UploadResponse = {
//   url: string
// }
