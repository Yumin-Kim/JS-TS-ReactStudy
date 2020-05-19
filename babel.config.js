function isWebTarget(caller) {
    return Boolean(caller && caller.target === 'web');
  }
  
  function isWebpack(caller) {
    return Boolean(caller && caller.name === 'babel-loader');
  }
  
  module.exports = api => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);
  
    return {
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            useBuiltIns: web ? 'entry' : undefined, //polyfill을 쓰는 여부 "usage"사용시 polyfil 자동으로 추가
            targets: !web ? { node: 'current' } : undefined, //웹 브라우저 환경(ie,chrome) 이나 node 환경에 따라 최적화 다르게 
            modules: webpack ? false : 'commonjs',
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: ['@loadable/babel-plugin'],
    };
  };


//   @babel/preset-env { useBuiltIns: “entry”, corejs: 3 }

// - 폴리필 메서드들을 전역 스코프에 추가한다.

// - deprecated 된 @babel/polyfill을 대체한다.

// - 전역 오염 O

 

// @babel/preset-env { useBuiltIns: “usage”, corejs: 3 }

// - 사용된 폴리필 메서드만 전역 스코프에 추가한다.

// - 전역 오염 O

 

// @babel/plugin-transform-runtime { corejs: 3 }

// - 사용된 폴리필 메서드만 포함시키고, 해당 폴리필 메서드를 사용하도록 원본 코드를 변경한다.

// - 전역 오염 X