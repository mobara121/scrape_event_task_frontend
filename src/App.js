import './App.css';
import {useState, useEffect} from 'react';
import TableContent from './TableContent/TableContent';
import Maps from './Maps/Maps';
import {Form, Label, Input, Button} from 'reactstrap';
import { FormGroup } from '@material-ui/core';
import React from 'react'

const App = () => {
  const [events, setEvent] = useState([])
  const [freeWord, setFreeWord] = useState('');
  const [zip, setZip] = useState('');
  const [eventMaps, setEventMaps] = useState([])
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [address, setAddress] = useState('')

  const fetchEvent=()=>{
    fetch('http://localhost:3000/event/get', {
          method: 'GET',
      }).then((res)=>res.json())
      .then((events)=>{
        console.log(events)
        // debugger
        var eventMaps = new Array(events.map(event => event.location))
        setEventMaps(eventMaps)
        console.log(eventMaps)
        return setEvent(events)
      })
  }

    const geoLocationFetcher = (eventMapsArray) =>{
        // debugger;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${eventMapsArray}&key=AIzaSyAZxfWq048fxMREBEfePIQCFJIbZ0l7N_U`,{
            method: 'GET'
        })
        .then((res)=>res.json())
        .then((eventMaps) =>{
            console.log(eventMaps);
            var address = eventMaps.results[0].formatted_address
            console.log(address)
            setAddress(address)
            var lat = eventMaps.results[0].geometry.location.lat
            console.log(lat)
            setLat(lat)
            var lng =  eventMaps.results[0].geometry.location.lng
            console.log(lng)
            setLng(lng)       
            return ;       

        })
        .catch(err => console.log(err))
    }

  const handleSubmitWord = (e) => { 
    e.preventDefault();     
    fetch(`http://localhost:3000/event/getbyword/${freeWord}`,{
        method: 'GET'
    })
    .then((res)=>res.json())
    .then((events) =>{
        console.log(events);         
        return setEvent(events);
    })
    .catch(err => console.log(err))
  };

  const handleSubmitZip = (e) => { 
    e.preventDefault();     
    fetch(`http://localhost:3000/event/get/${zip}`,{
        method: 'GET'
    })
    .then((res)=>res.json())
    .then((events) =>{
        console.log(events);         
        return setEvent(events);
    })
    .catch(err => console.log(err))
  };

  useEffect(()=>{
    // handleSubmit()
    fetchEvent()
    setFreeWord('')
    setZip('')
    // geoLocationFetcher()
  }, [])

  return (
    <div className='App'>
      <h3 style={{fontSize: '3em'}}>Event Scrape</h3>
      <Form className="form" onSubmit={(e)=>handleSubmitWord(e)}>
        <FormGroup className="form-group">
          <Label style={{fontSize:'1.2em', marginRight:'5px', lineHeight:'4vh'}}>
            Search by free word
          </Label>
          <Input placeholder="ex. Dog" type="text" value={freeWord} onChange={(e)=>setFreeWord(e.target.value)}/>
        </FormGroup>
        <Button className="btn" type="submit" >Search</Button>              
      </Form>
      <Form className="form"  onSubmit={(e)=>handleSubmitZip(e)}>
        <FormGroup className="form-group">
        <Label style={{fontSize:'1.2em',marginRight:'13px', lineHeight:'4vh'}}>
            Search by  zip code
          </Label>
          <Input placeholder="ex. 46444" type="text" value={zip} onChange={(e)=>setZip(e.target.value)}/>
        </FormGroup>
        <Button type="submit" >Search</Button>              
      </Form>
      <TableContent events={events} eventMaps={eventMaps} geoLocationFetcher={geoLocationFetcher}/>
      <Maps address={address} lat={lat} lng={lng}/>    
    </div>
  )
}

export default App
