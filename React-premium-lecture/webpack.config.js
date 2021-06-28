const path = require('path');
// process.env.NODE_ENV = "production" 실서비스시 변형!!


module.exports = {
    name:'Tutorial',
    mode:'development',//실서비스 : production
    devtool:'eval', //실서비스시 : hidden-source-map
    resolve:{
        extensions:['.js','.jsx']
    },
    
    entry:{
        //입력
        app:['./client'],
    },
    //적용 할것들
    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                //자동으로 할당되는 설정값을 의미 // 미리 정의된 설정
                //preset은 플러그인들의 모음이며
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            //target은 어떤 브라우저를 지워할지 지정해주는 플러그인 
                            browsers:['> 5% in KR']
                        },
                        //debug:true,
                    }],
                    '@babel/preset-react'],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                    ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
                ],
            }
        }],
    },
    //plugins>> 따로 추가하고 싶은 플러그인들의 모음
    output:{
        //출력
        path:path.join(__dirname,'dist'),
        filename:'app.js',
        publicPath:'/dist/',
    },
};