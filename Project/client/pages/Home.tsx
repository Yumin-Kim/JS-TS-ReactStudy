import * as React from 'react'
import HomeSection from '../components/HomeSection'

export interface SectionDataType {
    contentTitle: string;
    subTitle:string;
}

const sectionData :SectionDataType[]  = [
    {
        contentTitle: "Section1",
        subTitle:"I was preparing on this Section1"
    }, {
        contentTitle: "Section2",
        subTitle:"I was preparing on this Section2"
    }, {
        contentTitle: "Section3",
        subTitle:"I was preparing on this Section3"
    }, {
        contentTitle: "Section4",
        subTitle:"I was preparing on this Section4"
    }
];

const Home = () => {
    return (
        <>
            <h1>Home Component!</h1>
            {sectionData.map((v, idx)=>
                <section key={`${idx}_${v.contentTitle}`} >
                    <HomeSection {...v} />
                </section>
            )}
        </>
    )
}

export default Home;