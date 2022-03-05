import { React, useEffect, useState } from 'react'
import { Typography, Grid, Box, ImageList, Divider, Link, Button } from '@mui/material'
import { MainPageStyle } from './styles'
import { CommonButton } from '../../styles/Common'

import ListView from '../../components/listView/ListView'
import SearchBox from '../../components/searchBox/SearchBox'
import constants from '../../constants/styles'
import TabPanel from './TabPanel'
import DetailPage from './DetailPage'
import SearchResultList from '../../components/listView/SearchResultList'

import {
  SIGNED_IN,
  NOT_SIGNED_IN
} from '../../redux/actions/index'
import { signInAction } from '../../redux/actions/authActions'
import { getProfileAction } from '../../redux/actions/profileActions'
import { useSelector, useDispatch } from 'react-redux'

const HomePage = () => {
  const [tabValue, setTabValue] = useState(0)
  const [searchResults, setSearchResults] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)

  const imagesDummy = [
    'https://books.google.com/books/content?id=GNnxzQEACAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE73sm8FczIXTFk1NR3ZB2_g6IsvAh4x6fF6w9pH8iHaBvXl_k6qUmmbQKzvxM0-qgF68F23hzKQ_gMOhIk5mg66Uo9n5RTfgsMN_xHwFFNtfgXn0FjuZ_50bD-pzDAsvaZoG9nkg&source=gbs_api',
    'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'http://books.google.com/books/content?id=AVVoPwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=hi6SoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=nh0eAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=sBk9DQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
  ]

  const goToSearch = () => {
    switchTabPanel(1)
  }
  const goToDetail = () => {
    switchTabPanel(2)
  }

  const searchResultItemClicked = (bookid) => {
    goToDetail()
    setSelectedBookId(bookid)
  }

  const switchTabPanel = (newValue) => {
    setTabValue(newValue)
  }

  const handleResult = (result) => {
    setTabValue(1)
    const items = []
    result.items.forEach(book => {
      items.push({
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail
      })
    })
    setSearchResults(items)
  }

  const handleError = (error) => {
    console.log(error)
  }

  const handleClear = () => {
    setSearchResults(null)
    console.log('clear results')
  }

  const setLoading = (value) => {
    console.log('loading = ' + value)
  }
  // Test purposes
  const signInState = useSelector(state => state.authReducer.type)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(signInState)
    if (signInState === null || signInState === NOT_SIGNED_IN) {
      dispatch(signInAction('a@a.com', 'password'))
    } if (signInState === SIGNED_IN) {
      dispatch(getProfileAction())
    }
  }, [signInState])

  return (
    <Grid container spacing={2} style={{ padding: '36px' }}>
      <Grid xs={6} item sm={2}>
        <Box style={MainPageStyle.CommonContainer}>
          <SearchBox
            style={MainPageStyle.SearchBar}
            handleResult={handleResult}
            handleClear={handleClear}
            handleError={handleError}
            setLoading={setLoading}
          ></SearchBox>
        </Box>

        <Box style={{ ...MainPageStyle.CommonContainer, marginTop: constants.space.medium }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='h6'><strong>Favorites</strong></Typography>
          </div>

          <Divider/>
          <ImageList cols={3} rowHeight={100}>
            {imagesDummy.map(value => (
              <img key={value} src={value} width={60} />
            ))}
          </ImageList>
          <Button style={CommonButton} variant="contained">Click</Button>
        </Box>
        <Box style={{ ...MainPageStyle.CommonContainer, marginTop: constants.space.medium }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='h6'><strong>Wanted</strong></Typography>
          </div>
          <ImageList cols={3} rowHeight={100}>
            {imagesDummy.map(value => (
              <img key={value} src={value} width={60} />
            ))}
          </ImageList>
          <Button style={CommonButton} variant="contained">Click</Button>
        </Box>
      </Grid>

      <Grid item xs={6} sm={8}>

        <TabPanel value={tabValue} index={0}>
          <ListView>
          </ListView>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant='h5'>Search results - page 1 of 113 pages</Typography>
          <Divider />
          <SearchResultList items={searchResults} onItemClicked={searchResultItemClicked}></SearchResultList>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <DetailPage title="Detail Page" bookid={selectedBookId} onGoBack={goToSearch}></DetailPage>
        </TabPanel>

      </Grid>

      <Grid item xs={0} sm={2}>
        <Box style={{ backgroundColor: 'red', height: '800px' }}>
          <h1>Ads area</h1>
        </Box>
        <Box style={MainPageStyle.AboutMeContainer}>
          <Divider />
          <Typography>
            <strong>ABOUT ME</strong>
          </Typography>
          <Link href="/#" underline="hover">Introduction</Link>
          <Link href="/#" underline="hover">LinkedIn</Link>
          <Link href="/#" underline="hover">Github</Link>
          <Link href="/#" underline="hover">About this app</Link>
        </Box>
      </Grid>
    </Grid >
  )
}

export default HomePage
