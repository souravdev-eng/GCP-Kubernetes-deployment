"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    Listener.prototype.subscriptionOptions = function () {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var subscribe = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscribe.on('message', function (msg) {
            console.log("Event received: ".concat(_this.subject, "/").concat(_this.queueGroupName));
            var parsedData = _this.perseMessage(msg);
            _this.onMessage(parsedData, msg);
        });
    };
    Listener.prototype.perseMessage = function (msg) {
        var data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'));
    };
    return Listener;
}());
exports.Listener = Listener;
