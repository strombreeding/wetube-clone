"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var videoSchema = new mongoose_1["default"].Schema({
    title: { type: String, trim: true, required: true, maxLength: 35 },
    fileUrl: { type: String, required: true },
    description: { type: String, trim: true, required: true, minLength: 10 },
    createdAt: { type: Date, "default": Date.now },
    s3Id: { type: String },
    hashtags: [{ type: String, trim: true }],
    views: { type: Number, "default": 1 },
    owner: { type: mongoose_1["default"].Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose_1["default"].Schema.Types.ObjectId, required: true, ref: "Comment" }]
});
var Video = mongoose_1["default"].model("Video", videoSchema);
exports["default"] = Video;
var Square = /** @class */ (function () {
    function Square(num) {
        this.num = num;
    }
    Square.prototype.getLength = function () {
        return this.num;
    };
    Square.prototype.setLength = function (num) {
        return this.num = num;
    };
    Square.prototype.draw = function () {
        var arr = [];
        var str = "";
        var a = this.num - 1; //num = 3 ==2 , 0 
        for (var i = 0; i < this.num; i++) {
            str = "";
            if (a === i || this.num === 0) { // 첫번째와 마지막은 *을 this.num 만큼 채움
                str += "*".repeat(this.num);
                arr.push(str);
            }
            else {
                //그외 빈공간은 첫번째와 마지막만 *을 찍어야함
                str += "*";
                str += " ".repeat(this.num - 1);
                str += "*";
                arr.push(str);
            }
        }
        return arr.join("\n");
    };
    return Square;
}());
var arr = [];
var str = "";
var a = num - 1; //num = 3 ==2 , 0 
for (var i = 0; i < num; i++) {
    str = "";
    if (a === i || num === 0) { // 첫번째와 마지막은 *을 this.num 만큼 채움
        str += "*".repeat(num);
        arr.push(str);
    }
    else {
        //그외 빈공간은 첫번째와 마지막만 *을 찍어야함
        str += "*";
        str += " ".repeat(num - 1);
        str += "*";
    }
}
