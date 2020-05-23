module.exports=(env)=>{
    const [enviroment,config] =Object.keys(env);
    return require(`./${enviroment}/webpack.${config}.js`)
}