import * as React from 'react'
import {FC} from 'react';
import {SectionDataType} from '../pages/Home';
import { Link } from 'react-router-dom';


const HomeSection : FC<SectionDataType> = ({contentTitle,subTitle}) =>{
    return(
        <>
            <Link to={`/${contentTitle}`} >{contentTitle}</Link>
            <h3>{subTitle}</h3>
        </>
    );
}

export default HomeSection;