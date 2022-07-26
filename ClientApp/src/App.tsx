import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { Countries } from './pages/Countries'
import { Passport } from './pages/Passport'
import { Landing } from './pages/Landing'
import { AddCountry } from './pages/AddCountry'
import { Country } from './pages/Country'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { getUser, isLoggedIn, logout } from './auth'
import { Footer } from './components/Footer'
import { AddRecipe } from './pages/AddRecipe'
import { AddMusic } from './pages/AddMusic'
import { AddMovie } from './pages/AddMovie'
import { CountryType } from './types'
// import { AddUserImage } from './pages/AddUserImage'

export function App() {
  return (
    <div>
      <header>{isLoggedIn() ? <LoggedInNav /> : <SignedOutNav />}</header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Countries />} />
          <Route path="/addCountry" element={<AddCountry />} />
          <Route path="/countries/:id/addRecipe" element={<AddRecipe />} />
          <Route path="/countries/:id/addMusic" element={<AddMusic />} />
          <Route path="/countries/:id/addMovie" element={<AddMovie />} />
          <Route path="/countries/:id" element={<Country />} />
          <Route path="/signupCountryCuisineNight7335" element={<SignUp />} />
          <Route path="/loginCountryCuisineNight7335" element={<Login />} />
          <Route path="/passport/:id" element={<Passport />} />
          <Route path="*" element={'No Match'} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function LoggedInNav() {
  const user = getUser()
  const history = useNavigate()
  const [countries, setCountries] = useState<CountryType[]>([])

  useEffect(() => {
    const loadCountries = () => {
      fetch(`/api/countries/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          setCountries(data)
        })
    }
    loadCountries()
  }, [])

  const randomCountryIds: Array<Number | undefined> = []

  function getRandomCountryId() {
    countries.forEach((country) => {
      randomCountryIds.push(country.id)
    })
  }
  getRandomCountryId()

  async function loadOneCountry() {
    var randomCountryId =
      randomCountryIds[Math.floor(Math.random() * randomCountryIds.length)]
    const response = await fetch('/api/countries/' + randomCountryId)

    if (response.ok) {
      console.log(response)
      history('/countries/' + randomCountryId)
      return response.json()
    } else {
      throw await response.json()
    }
  }

  function handleLogout() {
    logout()

    window.location.assign('/')
  }
  return (
    <>
      <Link to="/">
        <h4>
          Country <br /> Cuisine <br /> Night
        </h4>
      </Link>
      <nav>
        <ul>
          <li>
            <a
              className="fa-solid fa-magnifying-glass nav-icon"
              title="search for a country"
              href="/search"
            ></a>
          </li>
          <li>
            <button
              onClick={loadOneCountry}
              className="fa-solid fa-shuffle nav-icon"
              title="go to a random country"
            ></button>
          </li>
          <li>
            <a
              className="fa-solid fa-square-plus nav-icon"
              title="add a country"
              href="/addCountry"
            ></a>
          </li>

          <li>
            <a
              className="fa-solid fa-passport nav-icon nav-passport"
              title={`${user.firstName}'s passport`}
              href={`/passport/${user.id}`}
            ></a>
          </li>
          <button className="nav-button">
            <a
              href="/"
              className="link"
              onClick={function (event) {
                event.preventDefault()
                handleLogout()
              }}
            >
              Log Out
            </a>
          </button>
        </ul>
      </nav>
    </>
  )
}

function SignedOutNav() {
  const history = useNavigate()
  const [countries, setCountries] = useState<CountryType[]>([])

  useEffect(() => {
    const loadCountries = () => {
      fetch(`/api/countries/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          setCountries(data)
        })
    }
    loadCountries()
  }, [])

  const randomCountryIds: Array<Number | undefined> = []

  function getRandomCountryId() {
    countries.forEach((country) => {
      randomCountryIds.push(country.id)
    })
  }
  getRandomCountryId()

  async function loadOneCountry() {
    var randomCountryId =
      randomCountryIds[Math.floor(Math.random() * randomCountryIds.length)]
    const response = await fetch('/api/countries/' + randomCountryId)

    if (response.ok) {
      console.log(response)
      history('/countries/' + randomCountryId)
      return response.json()
    } else {
      throw await response.json()
    }
  }
  return (
    <>
      <Link to="/">
        <h4>
          Country <br /> Cuisine <br /> Night
        </h4>
      </Link>
      <nav>
        <ul>
          <li>
            <a
              className="fa-solid fa-magnifying-glass nav-icon"
              title="search for a country"
              href="/search"
            ></a>
          </li>
          <li>
            <button
              onClick={loadOneCountry}
              className="fa-solid fa-shuffle nav-icon"
              title="go to a random country"
            ></button>
          </li>
          {/* <button className="nav-button">
            <Link to="/login">Log In</Link>
          </button> */}
        </ul>
      </nav>
    </>
  )
}
