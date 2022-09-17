const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path")


module.exports ={
    watch : true,
    entry : {
        main:"./src/client/ts/main.ts",
        videoPlayer:"./src/client/ts/videoPlayer.ts",
        userEdit:"./src/client/ts/userEdit.ts",
        upload:"./src/client/ts/upload.ts",
        recorder:"./src/client/ts/recorder.ts",
    },
    plugins: [new MiniCssExtractPlugin({
            filename:"css/styles.css",
        })
    ],
    mode:"development",
    //production
    output : {
        filename: "js/[name].js",
        path : path.resolve(__dirname,"assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions:['.tsx','.ts','js']
    }

}