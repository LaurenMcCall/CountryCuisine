import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { authHeader, getUserId, isLoggedIn } from '../auth'
import { CountryType, MusicType, MovieType, RecipeType } from '../types'

async function loadOneCountry(id: string | undefined) {
  const response = await fetch(`/api/countries/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

// Null Object Pattern

export function Country() {
  const { id } = useParams<{ id: string }>()

  // const user = getUser()
  // const [countryId, setCountryId] = useState<CountryType>()
  // console.log(setCountryId)

  const NullCountry: CountryType = {
    id: Number(),
    userId: Number(),
    dateAdded: new Date(),
    name: '',
    flagUrl: '',
    recipes: [],
    movies: [],
    musics: [],
  }

  // const [newStamp, setNewStamp] = useState(NullCountry)
  // console.log(setNewStamp)
  // useEffect(() => {
  //   const loadCountry = () => {
  //     fetch(`/api/countries/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setNewStamp(data)
  //       })
  //   }
  //   loadCountry()
  // }, [id])

  // async function addCountryToPassport() {
  //   console.log(newStamp)
  //   const response = await fetch(`/api/Users/${user.id}/Countries/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: authHeader(),
  //     },
  //     body: JSON.stringify(newStamp),
  //   })

  //   if (response.ok) {
  //     return response.json()
  //   } else {
  //     throw await response.json()
  //   }
  // }

  // const createNewPassportStamp = useMutation(addCountryToPassport, {
  //   onSuccess: function () {
  //     fetch(`/api/users/${id}`)
  //       .then((response) => response.json())
  //       .then(() => history(`../countries/${country.id}`))
  //   },
  // })

  // async function handleButtonSubmit(
  //   event: React.ChangeEvent<HTMLButtonElement> | any
  // ) {
  //   event.preventDefault()

  //   addCountryToPassport()
  // }

  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [musics, setMusics] = useState<MusicType[]>([])
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    const loadRecipes = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data.recipes)
        })
    }
    loadRecipes()
  }, [id])

  useEffect(() => {
    const loadMusics = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMusics(data.musics)
        })
    }
    loadMusics()
  }, [id])

  useEffect(() => {
    const loadMovies = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movies)
        })
    }
    loadMovies()
  }, [id])

  // useEffect(() => {
  //   loadOneCountry(`${countryId}`).then((data) => setNewStamp(data))
  //   console.log(newStamp)
  // }, [countryId])

  const { data: country = NullCountry } = useQuery<CountryType>(
    ['one-country', id],
    () => loadOneCountry(id)
  )

  // Delete a country
  const history = useNavigate()

  async function handleDelete(id: number | undefined) {
    if (id === undefined) {
      return
    }

    const response = await fetch(`/api/Countries/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const deleteCountry = useMutation(handleDelete, {
    onSuccess: function () {
      history('/')
    },
    onError: function () {
      console.log('oops!')
    },
  })

  return (
    <div>
      <section className="country-container">
        <img
          className="country-container country-mr"
          src={country.flagUrl}
          // alt={`image of ${country.name}'s flag`}
          width="74em"
        />
        <p className="country-ml">{country.name}</p>
      </section>
      <div>
        {/* <div className="country-icon-container">
          <i className="fa-solid fa-square-plus country-icon-addToPassport country-add-to-passport"></i>

          <span className="country-icon-text country-add-to-passport">
            Add to my Passport
          </span>
        </div> */}
        <section>
          <div className="country-icon-container">
            <i className="fa-solid fa-utensils country-icon"> </i>
            <span className="country-icon-text">EAT</span>
          </div>
          {recipes?.map((recipe) => (
            <div key={recipe.id}>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">
                  <a className="mouse" href={recipe.url}>
                    {recipe.name}
                  </a>
                </h3>
                <p className="country-p">{recipe.description}</p>
                <a className=" a-country" href={recipe.url}>
                  <img
                    src={recipe.photoUrl}
                    alt={`image of ${recipe.name}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          {isLoggedIn() ? (
            <Link to={`/countries/${id}/addrecipe`}>
              <button className="add-button"> Add Recipe</button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div>
        <section>
          <div className="country-icon-container">
            <i className="fa-solid fa-music country-icon"> </i>
            <span className="country-icon-text">LISTEN</span>
          </div>
          {musics?.map((music) => (
            <div key={music.id}>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">
                  <a href={music.url}>{music.artist}</a>
                </h3>
                <p className="country-p">{music.description}</p>
                <a className=" a-country" href={music.url}>
                  <img
                    src={music.photoUrl}
                    alt={`image of ${music.artist}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          {isLoggedIn() ? (
            <Link to={`/countries/${id}/addmusic`}>
              <button className="add-button">Add Music</button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="country-mb">
        <section>
          <div className="country-icon-container">
            <i className="fa-solid fa-video country-icon"> </i>
            <span className="country-icon-text">WATCH</span>
          </div>
          {movies?.map((movie) => (
            <div key={movie.id}>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">
                  <a href={movie.url}>{movie.title}</a>
                </h3>
                <p className="country-p">{movie.description}</p>
                <a className=" a-country" href={movie.url}>
                  <img
                    src={movie.photoUrl}
                    alt={`image of ${movie.title}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          {isLoggedIn() ? (
            <Link to={`/countries/${id}/addmovie`}>
              <button className="add-button">Add Movie</button>
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className="a-country">
          {country.userId === getUserId() ? (
            <button
              className="add-button"
              onClick={function (event) {
                event.preventDefault()
                deleteCountry.mutate(country.id)
              }}
            >
              Delete Country
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
