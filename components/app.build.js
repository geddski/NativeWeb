({
    appDir: "../",
    baseUrl: "components/",
    dir: "../../nativeweb-build",
    paths:{
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min'
//        'jquery': 'jquery'
    },
    modules: [
        { name: "main" },
        { name: "tests" }
    ],
    optimizeCss: "standard",
//    optimize: "none",
    inlineText: true
})