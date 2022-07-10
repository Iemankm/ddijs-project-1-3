"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const index_1 = __importDefault(require("./routes/index"));
const blogs_1 = __importDefault(require("./routes/blogs"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', 3000);
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.engine(".hbs", (0, express_handlebars_1.create)({
            layoutsDir: path_1.default.join(this.app.get("views"), "layouts"),
            partialsDir: path_1.default.join(this.app.get("views"), "partials"),
            defaultLayout: "main",
            extname: ".hbs",
        }).engine);
        this.app.set("view engine", ".hbs");
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(index_1.default);
        this.app.use('/blogs', blogs_1.default);
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'p')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server is running on port', this.app.get('port'));
        });
    }
}
exports.default = Application;
