const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path")

const BASE_TS = "./src/client/ts/"

module.exports ={
    // watch : true,
    entry : {
        main:BASE_TS+"main.ts",
        videoPlayer: BASE_TS+"videoPlayer.ts",
        userEdit:BASE_TS+"userEdit.ts",
        upload:BASE_TS+"upload.ts",
        recorder:BASE_TS+"recorder.ts",
        commentSection:BASE_TS+"commentSection.ts",
    },
    plugins: [new MiniCssExtractPlugin({
            filename:"css/styles.css",
        })
    ],
    // mode:"production",
    //development
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