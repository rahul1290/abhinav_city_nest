"use strict";
exports.__esModule = true;
exports.SerializeInterceptors = exports.Serialize = void 0;
var common_1 = require("@nestjs/common");
var class_transformer_1 = require("class-transformer");
var rxjs_1 = require("rxjs");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptors(dto));
}
exports.Serialize = Serialize;
var SerializeInterceptors = /** @class */ (function () {
    function SerializeInterceptors(dto) {
        this.dto = dto;
    }
    SerializeInterceptors.prototype.intercept = function (context, handler) {
        var _this = this;
        //console.log('Im running before the handler.',context);
        return handler.handle().pipe((0, rxjs_1.map)(function (data) {
            // console.log('Im running before response is send out',data);
            return (0, class_transformer_1.plainToClass)(_this.dto, data, {
                excludeExtraneousValues: true
            });
        }));
    };
    return SerializeInterceptors;
}());
exports.SerializeInterceptors = SerializeInterceptors;
