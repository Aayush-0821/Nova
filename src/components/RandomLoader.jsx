import React from 'react'
import { useEffect, useState } from 'react'
import './loaders/Loaders.css';
import { loaderList } from './loaders/loader';

export default function RandomLoader() {

    const [LoaderComponent,setLoaderComponent] =useState(null);

    useEffect(()=>{
        const randomIndex=Math.floor(Math.random()*loaderList.length);
        setLoaderComponent(()=>loaderList[randomIndex]);
    },[])

    return LoaderComponent?<LoaderComponent />:null;
}