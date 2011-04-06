({
    appDir: "../",
    baseUrl: "components/",
    dir: "../../nativeweb-build",
    paths:{
        'jquery': 'jquery'
    },
    modules: [
        { name: "main" },
        { name: "tests" }
    ],
    optimizeCss: "standard",
//    optimize: "closure",
    inlineText: true
})