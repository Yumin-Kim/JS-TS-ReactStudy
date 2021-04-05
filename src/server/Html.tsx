import * as  React from 'react';

const Html = (props:any) => {
    return (
        <>
            <html lang="en" >
                <head>
                    <meta charSet="utf-8" />
                    <title>React_Templete</title>
                    <script dangerouslySetInnerHTML={{__html:props.preloadState}} ></script>
                    <script dangerouslySetInnerHTML={{__html:props.preloadRedux}} ></script>
                </head>
                <body>
                    <div id="root">{props.children}</div>
                    <script src={props.script}></script>
                </body>
            </html>
        </>
    );

}

export default Html; 