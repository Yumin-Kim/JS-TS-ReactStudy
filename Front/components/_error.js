import Error from 'next/error';
import React from 'react';

const MyError  = (props) =>{
    console.log(props);
    return(
        <>
            <h1>에러 발생</h1>
            <Error statusCode={props.statusCode} />
        </>
    )
}

MyError.defaultProps ={
    statusCode : 400,
}

MyError.getInitialProps = async (context) => {
    const statusCode = context.res ? context.res.statusCode:context.err ? context.err.statusCode :null;
    return{ statusCode }
}

export default MyError;